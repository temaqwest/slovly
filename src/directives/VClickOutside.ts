export default {
  mounted: function (el: any, binding: any) {
    el.clickOutsideEvent = function (event: Event) {
      const target = event.target as EventTarget

      if (!(el === target || el.contains(target))) {
        binding.value()
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: function (el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
