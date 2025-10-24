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
exports.AwsIconSupplier = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const icon_1 = require("../component/icon");
class AwsIconSupplier {
    constructor(iconsBasePath) {
        this.iconsBasePath = iconsBasePath;
        const resourceToImageMappingData = fs.readFileSync(path.join(__dirname, "awsResouceIconMatches.json")).toString();
        this.resourceToImageMapping = JSON.parse(resourceToImageMappingData);
    }
    matchIcon(resourceType, resourceProps) {
        switch (resourceType) {
            case "AWS::EC2::Instance":
                return this.matchEC2InstanceIcon(resourceProps);
            case "AWS::RDS::DBInstance":
                return this.matchRDSInstanceIcon(resourceProps);
            default: {
                const prefix = resourceType.split("::").slice(0, 2).join("::");
                const mappingGroup = this.resourceToImageMapping.find(mapping => {
                    return mapping.resourcePrefix == prefix;
                });
                if (mappingGroup != undefined) {
                    const specific = mappingGroup.specificResources.find(it => {
                        return it.resourceType == resourceType;
                    });
                    if (specific != undefined && specific.filePath != undefined && specific.filePath.length > 0) {
                        return new icon_1.ComponentIcon(path.join(this.iconsBasePath, specific.filePath));
                    }
                    else {
                        if (mappingGroup['genericFilePath'] !== undefined) {
                            if (mappingGroup['genericFilePath'] === null)
                                return new icon_1.ComponentIcon(null, icon_1.ComponentIconFormat.SMALLER);
                            else
                                return new icon_1.ComponentIcon(path.join(this.iconsBasePath, mappingGroup.genericFilePath), icon_1.ComponentIconFormat.SMALLER);
                        }
                    }
                }
            }
        }
        return null;
    }
    matchEC2InstanceIcon(awsresourceProps) {
        return this.instanceIconByFamily("AWS::EC2::Instance", "instanceType", 2, 0, awsresourceProps);
    }
    matchRDSInstanceIcon(awsresourceProps) {
        return this.instanceIconByFamily("AWS::RDS::DBInstance", "dbInstanceClass", 3, 1, awsresourceProps);
    }
    instanceIconByFamily(cfnResource, instanceTypeAttribute, instanceTypeParts, instanceTypeFamilyPartInd, props) {
        const parentInstanceIconsNode = this.resourceToImageMapping.find(mapping => {
            return mapping.resourcePrefix == cfnResource.split("::").slice(0, 2).join("::");
        });
        const instanceIconsNode = parentInstanceIconsNode.specificResources.find(mapping => {
            return mapping.resourceType == cfnResource;
        });
        if (props[instanceTypeAttribute] !== undefined && props[instanceTypeAttribute].split(".").length == instanceTypeParts) {
            const instanceFamily = (props[instanceTypeAttribute].split("."))[instanceTypeFamilyPartInd];
            if (instanceIconsNode["families"][instanceFamily.toUpperCase()] !== undefined) {
                return new icon_1.ComponentIcon(path.join(this.iconsBasePath, instanceIconsNode["families"][instanceFamily.toUpperCase()]));
            }
        }
        return new icon_1.ComponentIcon(path.join(this.iconsBasePath, instanceIconsNode["filePath"]));
    }
}
exports.AwsIconSupplier = AwsIconSupplier;
//# sourceMappingURL=aws-icon-supplier.js.map