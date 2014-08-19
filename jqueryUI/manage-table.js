$(document).ready(function() {
    // 栅格：60 * 60，桌子，窗，门都是 45* 45，包厢 225*225 即有15px的槽
    // var draggableOpt = {
    //     revert: 'invalid',
    //     helper: "clone",
    //     scope: "meterial",
    //     stop: function() {}
    // };

    var GRID = 80;
    // 选择桌子区
    $(".material-wrap .material").draggable({
        revert: 'invalid',
        helper: "clone",
        scope: "meterial",
        stop: function() {}
    }).disableSelection();

    // todo 包厢里的东西拖着走，包厢与其包含的桌子在数据上也是有层次的
    // 直接拖入包厢的问题
    var floorBox = {
        $el: $(".floor"),
        init: function(grid) {
            var self = this;
            grid = grid || 80;
            this.grid = grid;
            this.offset = this.$el.offset();
            this.zIndex = 1;
            this.registerEvent();
            this.$el.droppable({
                scope: "meterial",
                tolerance: "fit", // 完全进入
                stack: ".floor .material",
                drop: function(event, ui) {
                    var $draggable = ui.draggable;
                    /*
                     * inner 来自拖放区域
                     * wrap-inner 来自包厢
                     * outer 来自外部
                     */
                    var dragFrom = self.getDragFrom($draggable);
                    // 在内部移动，不用处理 如果有类名in-wrap，则说明，它是能被包厢接收的
                    if (self.isInMaterialWrap(ui.helper)) {
                        console.log('移入包厢或在包厢中移动');
                        return;
                    }

                    if (dragFrom === 'inner') {
                        console.log('在区域内移动');
                        return;
                    }

                    var $meterial = ui.helper.clone();
                    $meterial.attr('data-from', 'inner');
                    $(this).append($meterial);

                    if (dragFrom === 'wrap-inner') {
                        console.log('从包厢里移出来');
                        var $wrapOffset = $draggable.closest('.wrap-material').offset();
                        $meterial.offset({
                            left: $meterial.offset().left + 　$wrapOffset.left,
                            top: $meterial.offset().top + 　$wrapOffset.top,
                        });
                        $draggable.remove(); // 从包厢中删除
                    } else {
                        console.log('从外面移进来');
                        // 如果是包厢的话
                        if ($meterial.hasClass('wrap-material')) {
                            $meterial.resizable({
                                grid: grid
                            });
                            $meterial.droppable({
                                scope: "meterial",
                                tolerance: "fit",
                                greedy: true,
                                stack: ".floor .wrap-material .material",
                                accept: '.material:not(.wrap-material)',
                                drop: function(event, ui) {
                                    var $draggable = ui.draggable;
                                    var $meterial;
                                    var dragFrom = self.getDragFrom($draggable);
                                    var $this;
                                    $this = $(this);
                                    $meterial = ui.helper.clone();
                                    $meterial.attr('data-from', 'wrap-inner');
                                    var $prevWrap = $($draggable.data('prev-wrap'));
                                    if (dragFrom === 'inner' || dragFrom === 'outer') {
                                        $(this).append($meterial);
                                        $meterial.css('left', $meterial.position().left - $this.position().left);
                                        $meterial.css('top', $meterial.position().top - $this.position().top);
                                        self.initMeterial($meterial);
                                        if (dragFrom === 'inner') {
                                            $draggable.remove();
                                        }
                                    } else if (dragFrom === 'wrap-inner') {
                                        if ($draggable.parent('.wrap-material')[0] === this) {
                                            console.log('包厢内部移动');
                                        } else {
                                            console.log('来自其他包厢');
                                            var left = ui.helper.offset().left - $this.offset().left;
                                            var top = ui.helper.offset().top - $this.offset().top;
                                            $meterial.css('left', left);
                                            $meterial.css('top', top);
                                            $(this).append($meterial);
                                            $draggable.remove();
                                            self.initMeterial($meterial);
                                        }
                                    }
                                    $meterial.data('prev-wrap', this);
                                    self.decorate($meterial);

                                }
                            });
                        }
                    }
                    self.initMeterial($meterial);
                    self.decorate($meterial);
                },
                hoverClass: 'active'
            });
        },
        endEdit: function(ctx) {
            var $this = $(ctx);
            var $material = $this.closest('.material');
            $material.find('.name').text($this.val());
            $material.removeClass('editing');
        },
        getDragFrom: function($draggable) {
            // outer: 外部 inner:内部 wrap-inner:包厢内
            // console.log($draggable.data('from'));
            return $draggable.attr('data-from');
        },
        isInMaterialWrap: function($elem) {
            if ($elem.hasClass('wrap-material')) {
                return false;
            }
            var self = this;
            var $materialWrap = this.$el.find('.wrap-material');
            var isIn = false;
            $materialWrap.each(function() {
                if (self.isIn($elem, $(this))) {
                    isIn = true;
                    return false;
                }
            });
            return isIn;
        },
        isIn: function($elem, $wrap) {
            var elemLoc = {
                left: $elem.offset().left,
                top: $elem.offset().top,
                right: $elem.offset().left + $elem.width(),
                bottom: $elem.offset().top + $elem.height()
            };
            var wrapLoc = {
                left: $wrap.offset().left,
                top: $wrap.offset().top,
                right: $wrap.offset().left + $wrap.width(),
                bottom: $wrap.offset().top + $wrap.height()
            };
            // 碰撞检测。。。
            if (
                elemLoc.left >= wrapLoc.left &&
                elemLoc.top >= wrapLoc.top &&
                elemLoc.right <= wrapLoc.right &&
                elemLoc.bottom <= wrapLoc.bottom
            ) {
                return true;
            } else {
                return false;
            }
        },
        initMeterial: function($meterial) {
            var self = this;
            position = $meterial.offset();
            var fixedPos = this.getSnap(position); //贴近网格
            $meterial.offset(fixedPos).draggable({
                containment: '.floor',
                scope: "meterial",
                helper: false,
                // grid: [grid, grid],// 用网格移不到第一格
                start: function() {
                    $(this).css('z-index', self.zIndex++);
                },
                stop: function() {
                    var offset = $(this).offset();
                    $(this).offset(self.getSnap(offset));
                }
            }).disableSelection();
        },
        decorate: function($meterial) {
            var self = this;
            var $editInput = $meterial.find('input');
            if ($editInput.length === 0) {
                var self = this;
                var $removeBtn = $('<a>').addClass('remove-btn').html('&times;').attr('href', 'javascript:void(0);');
                var $editInput = $('<input>').attr('type', 'text').val($meterial.find('a').text());
                $meterial.append($removeBtn);
                $meterial.append($editInput);
            }
            $editInput.blur(function() {
                self.endEdit(this);
            });

            $editInput.keyup(function(evt) {
                if (evt.keyCode == 13) {
                    self.endEdit(this);
                }
            });
        },
        registerEvent: function() {
            // 删除
            this.$el.on('click', '.material .remove-btn', function(evt) {
                $(evt.currentTarget).closest('.material').remove();
            });

            // 重命名
            this.$el.on('dblclick', '.material a', function(evt) {
                var $this = $(evt.currentTarget);
                var $parent = $this.closest('.material');
                var $input = $parent.find(':text');
                $parent.addClass('editing');
                $input.focus();
                cursorMoveToEnd($input);
            });
        },
        getSnap: function(offset) { //让物件的位置贴着网格,往左上方向靠
            var grid = this.grid;
            var parentOffset = this.offset;
            var reOffset = {
                left: offset.left - parentOffset.left,
                top: offset.top - parentOffset.top
            };
            reOffset.left = Math.floor(reOffset.left / grid) * grid;
            reOffset.top = Math.floor(reOffset.top / grid) * grid;

            offset.left = reOffset.left + parentOffset.left;
            offset.top = reOffset.top + parentOffset.top;
            return offset;

        },
        getSelectedMaterials: function() {
            var self = this;
            var res = [];
            var $allMaterials = this.$el.find('.material');
            $allMaterials.each(function() {
                var $this = $(this);
                var info = {};
                info.id = $this.data('id');
                info.pos = self.getMaterialPos($this.offset());
                info.name = $this.find('.name').text();
                res.push(info);
            });
            return res;
        },
        getMaterialPos: function(offset) {
            var grid = this.grid;
            var parentOffset = this.offset;
            var reOffset = {
                left: offset.left - parentOffset.left,
                top: offset.top - parentOffset.top
            };
            var pos = {
                column: reOffset.left / grid + 1,
                row: reOffset.top / grid + 1,
            }
            return pos;
        }
    };

    function cursorMoveToEnd($input) {
        var length = $input.val().length;
        moveCursor($input[0], length, length);
    }

    function moveCursor(input, start, end) {
        start = parseInt(start, 10);
        end = parseInt(end, 10);
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(start, end);
        } else if (input.createTextRange) { // IE
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.inputect();
        }
    }

    floorBox.init();
});
