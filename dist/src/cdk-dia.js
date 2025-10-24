"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkDia = exports.Renderers = void 0;
const cdk = __importStar(require("../src/cdk"));
const path = __importStar(require("path"));
const diagrams = __importStar(require("../src/diagram"));
const graphviz = __importStar(require("../src/render/graphviz"));
const cytoscape = __importStar(require("../src/render/cytoscape"));
var Renderers;
(function (Renderers) {
    Renderers["GRAPHVIZ"] = "graphviz-png";
    Renderers["CYTOSCAPE"] = "cytoscape-html";
})(Renderers || (exports.Renderers = Renderers = {}));
class CdkDia {
    async generateDiagram(treeJsonPath, targetPath, collapse, collapseDoubleClusters, cdkBasePath = require.resolve('cdk-dia/package.json'), includedStacks = false, excludedStacks = undefined, renderer) {
        const cdkTree = cdk.EnhancedTreeLoader.load(path.isAbsolute(treeJsonPath) ? treeJsonPath : path.join(process.cwd(), treeJsonPath));
        const generator = new diagrams.AwsDiagramGenerator(new diagrams.AwsEdgeResolver(), new diagrams.AwsIconSupplier(`${cdkBasePath}`));
        const diagram = generator.generate(cdkTree, collapse, collapseDoubleClusters, includedStacks, excludedStacks !== null && excludedStacks !== void 0 ? excludedStacks : undefined);
        switch (renderer) {
            case Renderers.GRAPHVIZ:
                return new graphviz.Graphviz().render({
                    diagram: diagram,
                    path: `${targetPath}`
                });
            case Renderers.CYTOSCAPE:
                return new cytoscape.Cytoscape().render({
                    diagram: diagram,
                    path: `${targetPath}`
                });
            default:
                throw Error(`Unknown renderer: ${renderer}`);
        }
    }
}
exports.CdkDia = CdkDia;
//# sourceMappingURL=cdk-dia.js.map