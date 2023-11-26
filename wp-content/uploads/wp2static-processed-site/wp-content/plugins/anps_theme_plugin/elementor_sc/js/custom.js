jQuery(window).on("elementor/frontend/init", () => {
  if (window.elementor) {
    elementor.hooks.addFilter(
      "elements/column/contextMenuGroups",
      addNestedItemToContextMenu
    );
  }

  function addNestedItemToContextMenu(groups, element) {
    // Find index of Elementor default clipboard
    var clipboard_index = groups.findIndex(function (item) {
      return "addNew" === item.name;
    });

    // Push new context item inside clipboard
    groups[clipboard_index].actions.push({
      name: "anps-nested-col",
      title: "Anps Nested Column",
      callback: function () {
        insertNestedSection(element);
      },
      isEnabled: function () {
        return true;
      },
    });
    //push new anps side content context item inside
    groups[clipboard_index].actions.push({
      name: "anps-side-content",
      title: "Anps Side Content",
      callback: function () {
        insertSideContentWrapper(element);
      },
      isEnabled: function () {
        return true;
      },
    });

    //push box container elemento
    groups[clipboard_index].actions.push({
      name: "anps-side-content",
      title: "Anps Box Container",
      callback: function () {
        insertBoxContainerWrapper(element);
      },
      isEnabled: function () {
        return true;
      },
    });

    return groups;
  }

  //Function to insert nested section
  function insertNestedSection(element) {
    var element_view = element.getContainer().view;
    if (element_view.getElementType() === "column") {
      // Insert new inner section
      element_view.addElement({
        elType: "section",
        isInner: true,
        settings: {},
        elements: [
          {
            id: elementor.helpers.getUniqueID(),
            elType: "column",
            isInner: true,
            settings: {
              _column_size: 100,
            },
            elements: [],
          },
        ],
      });
    }
  }

  //Function to insert nested side container
  function insertSideContentWrapper(element) {
    var element_view = element.getContainer().view;
    if (element_view.getElementType() === "column") {
      // Insert new inner section
      element_view.addElement({
        elType: "section",
        isInner: true,
        settings: {
          css_classes: "anps-side-content__row",
        },
        elements: [
          {
            id: elementor.helpers.getUniqueID(),
            elType: "column",
            isInner: true,
            settings: {
              _column_size: 100,
              css_classes: "anps-side-content__column",
            },
            elements: [],
          },
        ],
      });
    }
  }

  //function to add box container
  function insertBoxContainerWrapper(element) {
    var element_view = element.getContainer().view;
    if (element_view.getElementType() === "column") {
      // Insert new inner section
      element_view.addElement({
        elType: "section",
        isInner: true,
        settings: {
          css_classes: "anps-box-container__row",
        },
        elements: [
          {
            id: elementor.helpers.getUniqueID(),
            elType: "column",
            isInner: true,
            settings: {
              _column_size: 100,
              css_classes: "anps-box-container__column",
            },
            elements: [],
          },
        ],
      });
    }
  }

  //side container element on right click
  //display only on frontend,not working on editor
  if (!window.elementor) {
    function sideContainer() {
      jQuery(".anps-side-content__row").each(function () {
        var dusan = jQuery(this).parents(".elementor-column.elementor-col-50");
        if (dusan.offset().left < 500) {
          var spaceWidth =
            (jQuery("body").width() - jQuery(".container").width()) / 2;
          var columnWidth = jQuery(this)
            .parents(".elementor-widget-wrap")
            .width();

          var style = {
            width: spaceWidth + columnWidth + "px",
          };

          var styleColumn = {
            width: columnWidth + spaceWidth + "px",
          };

          if (
            jQuery(this).parents(".anps-side-content__row").index() === -1 &&
            jQuery(this).parents(".anps-side-content__column").index() === -1
          ) {
            style["left"] = -spaceWidth + "px";
          }

          jQuery(this).css(style);
          jQuery(".anps-side-content__column").css(styleColumn);
        } else {
          var spaceWidth =
            (jQuery("body").width() - jQuery(".container").width()) / 2;
          var columnWidth = jQuery(this)
            .parents(".elementor-widget-wrap")
            .width();

          var styleColumn = {
            width: columnWidth + spaceWidth + "px",
            right: "auto",
          };

          jQuery(this).css(styleColumn);
          jQuery(".anps-side-content__column").css(styleColumn);
        }
      });
    }

    jQuery(window).on("resize", sideContainer);
    sideContainer();
  }
});
