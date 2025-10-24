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
const cdk = __importStar(require("../../cdk"));
const stack_exports_container_1 = require("../aws/stack-exports-container");
const edge_target_1 = require("../aws/edge-target");
describe('stack-exports-container', () => {
    it('fromComponent() - parses exports', () => {
        const exportsNode = cdk.Node.fromObject({
            "id": "Exports",
            "path": "stack-with-topic/Exports",
            "children": {
                "Output{\"Ref\":\"thetopic9E1A294D\"}": {
                    "id": "Output{\"Ref\":\"thetopic9E1A294D\"}",
                    "path": "stack-with-topic/Exports/Output{\"Ref\":\"thetopic9E1A294D\"}",
                    "constructInfo": {
                        "fqn": "aws-cdk-lib.CfnOutput",
                        "version": "2.0.0"
                    }
                }
            },
            "constructInfo": {
                "fqn": "constructs.Construct",
                "version": "10.0.9"
            }
        });
        const container = stack_exports_container_1.StackExportsContainer.fromComponent(exportsNode);
        const export1 = container.getExport(edge_target_1.EdgeTargetStackExport.fromFnImportValue('stack-with-topic:ExportsOutputRefthetopic9E1A294DCC1C73D6'));
        expect(export1).toEqual('thetopic9E1A294D');
    });
});
//# sourceMappingURL=stack-exports-container.test.js.map