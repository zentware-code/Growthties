/**
 * dropdown.clean.js
 * - Modern syntax, comments, smaller surface area
 * - Removed legacy/commented blocks
 * - Kept original function names to avoid breaking external calls
 * - Organized by: bootstrap → helpers → init → API → renderers → actions
 * Dependencies: jQuery, showMessage(), BindDropDownList()
 */

// ===============================
// bootstrap
// ===============================
const DropdownBinder = {
    /** payload object sent to server */
    DDLData: {},
    /** jQuery dropdown element e.g. $('#ddlCountry') */
    DDLElem: {},

    /** Fire the population request */
    Execute() {
        const payload = JSON.stringify({ data: this.DDLData });

        // NOTE: async:false kept intentionally to preserve legacy behavior
        $.ajax({
            type: "POST",
            url: "/ScriptJson/DropDownPopulation",
            data: payload,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: (data, status) => {
                if (status === "success") {
                    BindDDL(this.DDLElem, data);
                } else {
                    showMessage("Unable to process the request...", 0);
                }
            },
            error: () => showMessage("Unable to process the request...", 0)
        });
    }
};

// ===============================
// helpers
// ===============================
/**
 * Bind options to a dropdown
 * @param {jQuery} ddl - target dropdown (jQuery object)
 * @param {Array<{Text:string, Value:string|number}>} dataCollection
 */
function BindDDL(ddl, dataCollection) {
    if (!ddl || typeof ddl.append !== "function") return;

    // Only add "Select" for non-Module dropdowns (legacy rule)
    if ($.trim(ddl.selector) !== "#ddlModule") {
        ddl.append(new Option("Select", "", true));
    }

    (dataCollection || []).forEach(item => {
        ddl.append(new Option(item.Text, item.Value));
    });
}

// ===============================
// actions (demo)
// ===============================
/** Example demo binder */
function AjaxPostForDDL() {
    const payload = JSON.stringify({
        data: { tableName: "CompanyMaster_CM", Text: "CM_Name", Value: "CM_Id" }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/DropDownPopulation",
        data: payload,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: (data, status) => {
            if (status === "success") {
                BindDropDownList($("#ddldemo"), data);
            } else {
                showMessage("Unable to process the request...", 0);
            }
        },
        error: () => showMessage("Unable to process the request...", 0)
    });
}
