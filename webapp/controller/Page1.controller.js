sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./TesteDialog",
	"./utilities",
	"sap/ui/core/routing/History",
	'sap/ui/model/json/JSONModel'
], function(BaseController, MessageBox, TesteDialog, Utilities, History, JSONModel) {
	"use strict";
	

	return BaseController.extend("com.sap.build.standard.veterinaria.controller.Page1", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App5fad79356345bf1229e9f919";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype" && prop.includes("Set")) {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		_onRowPress: function(oEvent) {

			var sDialogName = "TesteDialog";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];
			if (!oDialog) {
				oDialog = new TesteDialog(this.getView());
				this.mDialogs[sDialogName] = oDialog;

				// For navigation.
				oDialog.setRouter(this.oRouter);
			}

			var context = oEvent.getSource().getBindingContext();
			oDialog._oControl.setBindingContext(context);

			oDialog.open();

		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Page1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			
			var dadosConsultas = null;
				$.ajax({
	                "url": "/VETERINARIA-NODE/consultas",
	                "method": "GET",
	                "timeout": 0,
	                async: false,
	                "headers": {
	                    "Content-Type": "application/json"
	                },
	                success: function (oData) {
	        			dadosConsultas = oData;
	        			
	                },
	                error: function (oError) {
		                // var sTargetPos = "";
		                // sTargetPos = (sTargetPos === "default") ? undefined : sTargetPos;
		                // sap.m.MessageToast.show("Erro!", {
		                //     duration: 10000 || 10000,
		                //     at: sTargetPos,
		                //     my: sTargetPos
		                // });
	                }
	            });
	            var oModelConsultas = new JSONModel();
	            oModelConsultas.setData({
	            	consultas: dadosConsultas
	            });
	            this.getView().setModel(oModelConsultas, "consultas");

		}
	});
}, /* bExport= */ true);
