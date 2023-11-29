jQuery(document).ready(function ($) {
  /** Anps Function for check page bulder */
  $(".anps_checkbox").click(function () {
    $(".anps_checkbox").each(function () {
      $(this).prop("checked", false);
    });
    $(this).prop("checked", true);
  });
  /** Filter for images demo */
  $("select.merlin__select-control").change(function () {
    var filters = $.map($("select.merlin__select-control").toArray(), function (
      e
    ) {
      return $(e).val();
    }).join(".");
    $("div#anps_demo_img").find("img").hide();
    $("div#anps_demo_img")
      .find("img." + filters)
      .show();
  });
});
