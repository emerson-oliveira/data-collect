
async function report(page, data) {
    await page.waitForTimeout(5000);
        dataFormatada = data.toLocaleDateString('pt-BR')

        let reportData = [];
        const {
            sessoes,
            paginas_sessoes,
            profundidade_rolagem,
            usuarios_distintos,
            rolagem_excessiva,
            retornos_rapidos,
            erros_javascript,
            cliques_continuos,
            cliques_continuos_absoluto,
            cliques_inativos,
            cliques_inativos_absoluto,
            mobile_porcentagem,
            mobile_absoluto,
            desktop_porcentagem,
            desktop_absoluto,
            outros_porcentagem,
            outros_absoluto

        } = await page.evaluate((selector) => {
            const sessoes = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_infoBanner__RFyf6 > div:nth-child(2) > div.dashboard_infoTile__qLmvt > div > div > div.dashboard_infoTileInfo__vHdsu.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_infoBanner__RFyf6 > div:nth-child(2) > div.dashboard_infoTile__qLmvt > div > div > div.dashboard_infoTileInfo__vHdsu.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3").innerText : "";
            const paginas_sessoes = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_infoBanner__RFyf6 > div:nth-child(3) > div.dashboard_infoTile__qLmvt > div > div > div.dashboard_infoTileInfo__vHdsu.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_infoBanner__RFyf6 > div:nth-child(3) > div.dashboard_infoTile__qLmvt > div > div > div.dashboard_infoTileInfo__vHdsu.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3").innerText : "";
            const profundidade_rolagem = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_infoBanner__RFyf6 > div:nth-child(4) > div.dashboard_infoTile__qLmvt > div > div > div.dashboard_infoTileInfo__vHdsu.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_infoBanner__RFyf6 > div:nth-child(4) > div.dashboard_infoTile__qLmvt > div > div > div.dashboard_infoTileInfo__vHdsu.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3").innerText : "";
            const usuarios_distintos = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(1) > div.dashboard_tileContent__XVR0e > div > div > div.dashboard_usersData__K8-tI > div:nth-child(6)") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(1) > div.dashboard_tileContent__XVR0e > div > div > div.dashboard_usersData__K8-tI > div:nth-child(6)").innerText : "";
            const rolagem_excessiva = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(3) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(3) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3").innerText : "";
            const retornos_rapidos = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(4) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(4) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3").innerText : "";
            const erros_javascript = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(8) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div > div > div > div.dashboard_halfPie__I51pG > div.dashboard_halfPieLabel__9FAFp.shared_darkGrayFontBold__bK3Bp.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(8) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div > div > div > div.dashboard_halfPie__I51pG > div.dashboard_halfPieLabel__9FAFp.shared_darkGrayFontBold__bK3Bp.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3").innerText : "";
            const cliques_continuos = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(1) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(1) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3").innerText : "";
            const cliques_continuos_absoluto = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(1) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_italicSubtitle__c4hmJ.dashboard_subtitle__HFgws.shared_lightGrayFont__IAlG3") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(1) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_italicSubtitle__c4hmJ.dashboard_subtitle__HFgws.shared_lightGrayFont__IAlG3").innerText : "";
            const cliques_inativos = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(2) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(2) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_loud__ynA6u.shared_darkBlueFont__owkq3").innerText : "";
            const cliques_inativos_absoluto = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(2) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_italicSubtitle__c4hmJ.dashboard_subtitle__HFgws.shared_lightGrayFont__IAlG3") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(2) > div.dashboard_tileContentBottomCurve__TzLsm.dashboard_tileContent__XVR0e > div:nth-child(2) > div.dashboard_insightsHighlight__IWXOW.dashboard_highlightedInfo__mrM9t > div > div > div > div.dashboard_italicSubtitle__c4hmJ.dashboard_subtitle__HFgws.shared_lightGrayFont__IAlG3").innerText : "";
            const mobile_porcentagem = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(3)") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(3)").innerText : "";
            const mobile_absoluto = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(4)") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(4)").innerText : "";
            const desktop_porcentagem = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(9)") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(9)").innerText : "";
            const desktop_absoluto = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(10)") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(10)").innerText : "";
            const outros_porcentagem = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(15)") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(15)").innerText : "";
            const outros_absoluto = document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(16)") ? document.querySelector("#clarity-app-root > div.wholePage.lightDesign > div.project > div > div > div > div > div.dashboard_tileGrid__ZW95E > div:nth-child(6) > div.dashboard_tileContent__XVR0e.dashboard_scrollingTileContent__lB4Rv > div > div > div > div.dashboard_legend__Z6dO5 > div:nth-child(16)").innerText : "";
            
        
                        
            return {
                sessoes,
                paginas_sessoes,
                profundidade_rolagem,
                usuarios_distintos,
                rolagem_excessiva,
                retornos_rapidos,
                erros_javascript,
                cliques_continuos,
                cliques_continuos_absoluto,
                cliques_inativos,
                cliques_inativos_absoluto,
                mobile_porcentagem,
                mobile_absoluto,
                desktop_porcentagem,
                desktop_absoluto,
                outros_porcentagem,
                outros_absoluto
            }
        });

        reportData.push({
            data: dataFormatada,
            sessoes,
            paginas_sessoes,
            profundidade_rolagem,
            usuarios_distintos,
            rolagem_excessiva,
            retornos_rapidos,
            erros_javascript,
            cliques_continuos,
            cliques_continuos_absoluto,
            cliques_inativos,
            cliques_inativos_absoluto,
            mobile_porcentagem,
            mobile_absoluto,
            desktop_porcentagem,
            desktop_absoluto,
            outros_porcentagem,
            outros_absoluto
        })
        //console.log(reportData)
    return reportData;
}
//await report(page, data)
module.exports = report;