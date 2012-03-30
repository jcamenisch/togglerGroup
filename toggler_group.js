(function($){
  $.fn.togglerGroup = function(options){
    options = $.extend({
      active_class: 'active'
    }, options)
    
    return this.each(function(){
      var
        group = $(this),
        panel_class = group.attr('rel'),
        panels = group.closest(':has(.'+panel_class+')').find('.'+panel_class);

      function target_panel(a){
        var target = a.targetElement({
          /*preload: (!$.browser.msie || $.browser.version >= '8') && {
            skeleton: '<div class="'+panel_class+'"></div>',
            insertAfter: '.'+panel_class,
            subpage: '.'+panel_class,
            complete: function(){ target.trigger('loadcontent') }
          }*/
        });
        return target
      }

      $('a', group).each(function(){
        $this = $(this)
        var target = target_panel($this)
        if (target.length) {
          $this.click(function(){
            var
              a = $(this),
              prev_item = group.find('.'+options.active_class),
              item = a.closest('li'); if (!item.length) item = a;

            prev_item.removeClass(options.active_class);
            if (panels) panels.hide();

            panel = target_panel(a).show()
            panel.find('a.'+options.active_class+':visible,.'+options.active_class+' a:visible').click(); //show any active subpanels
            a.parent().addClass(options.active_class);
            if (options.afterShow)
              options.afterShow.call(panel)
            return false;
          });
        }
      });
      $('a.'+options.active_class+':visible,.'+options.active_class+' a:visible', group)
        .triggerHandler('click');             //show any active panels;
    });
  }
})(jQuery);
