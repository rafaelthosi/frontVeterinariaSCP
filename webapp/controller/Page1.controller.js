sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./TesteDialog",
	"./utilities",
	"sap/ui/core/routing/History",
	'sap/ui/model/json/JSONModel',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, TesteDialog, Utilities, History, JSONModel, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.veterinaria.controller.Page1", {
		// FILTROS
			// DONOS
				onFilterInvoices : function (oEvent) {
				
					// build filter array
					var aFilter = [];
					var sQuery = oEvent.getParameter("query")
		
					if (sQuery) {
						aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
					}
					
					
					// filter binding
					var oList = this.byId("tableDonos");
					var oBinding = oList.getBinding("items");
					oBinding.filter(aFilter);
				},
				
			//ANIMAIS
				onFilterInvoices2 : function (oEvent) {
					// build filter array
					var aFilter = [];
					var sQuery = oEvent.getParameter("query")
		
					if (sQuery) {
						aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
					}
					
					
					// filter binding
					var oList = this.byId("tableAnimais");
					var oBinding = oList.getBinding("items");
					oBinding.filter(aFilter);
				},
			
			//CONSULTAS
				onFilterInvoices3 : function (oEvent) {
					// build filter array
					var aFilter = [];
					var sQuery = oEvent.getParameter("query")
		
					if (sQuery) {
						aFilter.push(new Filter("status", FilterOperator.Contains, sQuery));
					}
					
					
					// filter binding
					var oList = this.byId("tableConsultas");
					var oBinding = oList.getBinding("items");
					oBinding.filter(aFilter);
				},
				
			//VETERINÁRIOS
				onFilterInvoices4 : function (oEvent) {
					// build filter array
					var aFilter = [];
					var sQuery = oEvent.getParameter("query")
		
					if (sQuery) {
						aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
					}
					
					
					// filter binding
					var oList = this.byId("tableVeterinarios");
					var oBinding = oList.getBinding("items");
					oBinding.filter(aFilter);
				},
		
		handleRouteMatched: function (oEvent) {
			var sAppId = "App5fad79356345bf1229e9f919";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function (oParam) {
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
		_onRowPress: function (oEvent) {

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
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Page1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			// DONOS
			var dadosDonos = null;
			$.ajax({
				"url": "/VETERINARIA-NODE/donos",
				"method": "GET",
				"timeout": 0,
				async: false,
				"headers": {
					"Content-Type": "application/json"
				},
				success: function (oData) {
					dadosDonos = oData;

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
			var oModelDonos = new JSONModel();
			oModelDonos.setData({
				donos: dadosDonos
			});
			this.getView().setModel(oModelDonos, "donos");

			// ANIMAIS
			var dadosAnimais = null;
			$.ajax({
				"url": "/VETERINARIA-NODE/animais",
				"method": "GET",
				"timeout": 0,
				async: false,
				"headers": {
					"Content-Type": "application/json"
				},
				success: function (oData) {
					dadosAnimais = oData;

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
			var oModelAnimais = new JSONModel();
			oModelAnimais.setData({
				animais: dadosAnimais
			});
			this.getView().setModel(oModelAnimais, "animais");

			// CONSULTAS
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

			// VETERINARIOS
			var dadosVeterinarios = null;
			$.ajax({
				"url": "/VETERINARIA-NODE/veterinarios",
				"method": "GET",
				"timeout": 0,
				async: false,
				"headers": {
					"Content-Type": "application/json"
				},
				success: function (oData) {
					dadosVeterinarios = oData;

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
			var oModelVeterinarios = new JSONModel();
			oModelVeterinarios.setData({
				veterinarios: dadosVeterinarios
			});
			this.getView().setModel(oModelVeterinarios, "veterinarios");

			// TAMANHO DE TODOS
			var lengthVets = dadosVeterinarios.length;
			var lengthDonos = dadosDonos.length;
			var lengthAnimais = dadosAnimais.length;
			var lengthConsultas = dadosConsultas.length;

			var length = {
				length: {
					vets: lengthVets,
					donos: lengthDonos,
					animais: lengthAnimais,
					consultas: lengthConsultas
				}
			};

			var oModelLength = new JSONModel(length);
			this.getView().setModel(oModelLength, "length");
			console.log(length);
		}
	});
}, /* bExport= */ true);