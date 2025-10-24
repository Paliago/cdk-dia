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
exports.EnhancedTreeLoader = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const cdk_tree_1 = require("./cdk-tree");
class EnhancedTreeLoader {
    static load(filePath) {
        const treeJson = fs.readFileSync(filePath).toString();
        const treeObject = JSON.parse(treeJson);
        const manifestPath = path.join(path.dirname(filePath), 'manifest.json');
        let manifestMetadata = {};
        try {
            if (fs.existsSync(manifestPath)) {
                const manifestJson = fs.readFileSync(manifestPath).toString();
                const manifest = JSON.parse(manifestJson);
                manifestMetadata = this.extractMetadataFromManifest(manifest);
            }
        }
        catch (error) {
            console.warn(`Warning: Could not read manifest.json: ${error}`);
        }
        const enhancedTreeObject = this.mergeManifestMetadata(treeObject, manifestMetadata);
        return cdk_tree_1.Tree.fromObject(enhancedTreeObject);
    }
    static extractMetadataFromManifest(manifest) {
        const metadata = {};
        if (manifest.artifacts) {
            for (const [, artifact] of Object.entries(manifest.artifacts)) {
                const artifactObj = artifact;
                if (artifactObj.metadata) {
                    for (const [constructPath, metadataArray] of Object.entries(artifactObj.metadata)) {
                        const cleanPath = constructPath.replace(/^\//, '');
                        if (!metadata[cleanPath]) {
                            metadata[cleanPath] = [];
                        }
                        metadata[cleanPath] = metadata[cleanPath].concat(metadataArray);
                    }
                }
            }
        }
        return metadata;
    }
    static mergeManifestMetadata(treeObject, manifestMetadata) {
        const enhancedTreeObject = { ...treeObject };
        if (enhancedTreeObject.tree) {
            enhancedTreeObject.tree = this.enhanceNode(enhancedTreeObject.tree, manifestMetadata, '');
        }
        return enhancedTreeObject;
    }
    static enhanceNode(node, manifestMetadata, currentPath) {
        if (typeof node !== 'object' || node === null) {
            return node;
        }
        const enhancedNode = { ...node };
        const manifestMeta = manifestMetadata[currentPath];
        if (manifestMeta && Array.isArray(manifestMeta)) {
            if (!enhancedNode.metadata) {
                enhancedNode.metadata = {};
            }
            const metadataByType = {};
            for (const meta of manifestMeta) {
                if (!metadataByType[meta.type]) {
                    metadataByType[meta.type] = [];
                }
                metadataByType[meta.type].push(meta.data);
            }
            for (const [type, dataArray] of Object.entries(metadataByType)) {
                if (enhancedNode.metadata[type]) {
                    enhancedNode.metadata[type] = [...enhancedNode.metadata[type], ...dataArray];
                }
                else {
                    enhancedNode.metadata[type] = dataArray;
                }
            }
        }
        if (enhancedNode.children) {
            const enhancedChildren = {};
            for (const [childName, child] of Object.entries(enhancedNode.children)) {
                const childPath = currentPath ? `${currentPath}/${childName}` : childName;
                enhancedChildren[childName] = this.enhanceNode(child, manifestMetadata, childPath);
            }
            enhancedNode.children = enhancedChildren;
        }
        return enhancedNode;
    }
}
exports.EnhancedTreeLoader = EnhancedTreeLoader;
//# sourceMappingURL=enhanced-tree-loader.js.map