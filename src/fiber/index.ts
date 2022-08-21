import ReactFiberReconciler, {
  Fiber,
  HostConfig,
  OpaqueHandle,
  OpaqueRoot,
} from "react-reconciler";

import {
  ConcurrentRoot,
  DefaultEventPriority,
} from "react-reconciler/constants";

import Box, { isBoxProps } from "../tui/box";
import Screen from "../tui/screen";
import Text from "../tui/text";

import type {
  Container,
  HostContext,
  Instance,
  Props,
  TextInstance,
  Type,
  UpdatePayload,
} from "./types";

/* eslint-disable @typescript-eslint/indent */
type TuiRootHostConfig = HostConfig<
  Type,            // Type
  Props,           // Props
  Container,       // Container
  Instance,        // Instance
  TextInstance,    // TextInstance
  any,             // SuspenseInstance
  any,             // HydratableInstance
  any,             // PublicInstance
  HostContext,     // HostContext
  UpdatePayload,   // UpdatePayload
  any,             // ChildSet
  NodeJS.Timeout,  // TimeoutHandle
  null             // NoTimeout
>;

type TuiRootReconciler = ReactFiberReconciler.Reconciler<
  Container,
  Instance,        // Instance
  TextInstance,    // TextInstance
  any,             // SuspenseInstance
  any              // PublicInstance
>;
/* eslint-enable @typescript-eslint/indent */

class TuiRoot {
  #hostConfig: TuiRootHostConfig;
  #reconciler: TuiRootReconciler;
  #internalRoot: OpaqueRoot;

  constructor(screen: Screen) {
    this.#hostConfig = this.#initializeHostConfig();
    this.#reconciler = ReactFiberReconciler(this.#hostConfig);

    const container: Container = {
      screen: screen,
      hostContext: {},
    };

    this.#internalRoot = this.#reconciler.createContainer(
      container,       // containerInfo: Container
      ConcurrentRoot,  // tag: RootTag
      null,            // hydrationCallbacks: SuspenseHydrationCallbacks<any> | null
      true,            // isStrictMode: boolean
      null,            // concurrentUpdatesByDefaultOverride: boolean | null
      "",              // identifierPrefix: string
      () => { },       // onRecoverableError: (error: Error) => void
      null,            // transitionCallbacks: ReactFiberReconciler.TransitionTracingCallbacks | null
    );
  }

  #initializeHostConfig(): TuiRootHostConfig {
    return {
      supportsMutation: true,
      supportsPersistence: false,
      createInstance: this.#createInstance,
      createTextInstance: this.#createTextInstance,
      appendInitialChild: this.#appendInitialChild,
      finalizeInitialChildren: this.#finalizeInitialChildren,
      prepareUpdate: this.#prepareUpdate,
      shouldSetTextContent: this.#shouldSetTextContent,
      getRootHostContext: this.#getRootHostContext,
      getChildHostContext: this.#getChildHostContext,
      getPublicInstance: this.#getPublicInstance,
      prepareForCommit: this.#prepareForCommit,
      resetAfterCommit: this.#resetAfterCommit,
      preparePortalMount: this.#preparePortalMount,
      scheduleTimeout: setTimeout,
      cancelTimeout: clearTimeout,
      noTimeout: null,
      supportsMicrotask: true,
      scheduleMicrotask: queueMicrotask,
      isPrimaryRenderer: true,
      warnsIfNotActing: true,
      getCurrentEventPriority: this.#getCurrentEventPriority,
      getInstanceFromNode: this.#getInstanceFromNode,
      beforeActiveInstanceBlur: this.#beforeActiveInstanceBlur,
      afterActiveInstanceBlur: this.#afterActiveInstanceBlur,
      prepareScopeUpdate: this.#prepareScopeUpdate,
      getInstanceFromScope: this.#getInstanceFromScope,
      detachDeletedInstance: this.#detachDeletedInstance,
      appendChild: this.#appendChild,
      appendChildToContainer: this.#appendChildToContainer,
      insertBefore: this.#insertBefore,
      insertInContainerBefore: this.#insertInContainerBefore,
      removeChild: this.#removeChild,
      removeChildFromContainer: this.#removeChildFromContainer,
      resetTextContent: this.#resetTextContent,
      commitTextUpdate: this.#commitTextUpdate,
      commitMount: this.#commitMount,
      commitUpdate: this.#commitUpdate,
      hideInstance: this.#hideInstance,
      hideTextInstance: this.#hideTextInstance,
      unhideInstance: this.#unhideInstance,
      unhideTextInstance: this.#unhideTextInstance,
      clearContainer: this.#clearContainer,
      supportsHydration: false,
    };
  }

  #createInstance(type: Type, props: Props, rootContainer: Container, _hostContext: HostContext, _internalHandle: OpaqueHandle) {
    switch (type) {
      case "box": {
        if (!isBoxProps(props)) {
          throw new Error("Invalid props");
        }
        return new Box(rootContainer.screen, props);
      }
      default:
    }
    debugger;
    throw new Error("Method not implemented.");
  }

  #createTextInstance(text: string, rootContainer: Container, _hostContext: HostContext, _internalHandle: OpaqueHandle) {
    return new Text(rootContainer.screen, text);
  }

  #appendInitialChild(parentInstance: Instance, child: Instance | TextInstance) {
    parentInstance.append(child);
  }

  #finalizeInitialChildren(_instance: Instance, _type: Type, _props: Props, _rootContainer: Container, _hostContext: HostContext) {
    return false;
  }

  #prepareUpdate(_instance: Instance, _type: Type, _oldProps: Props, _newProps: Props, _rootContainer: Container, _hostContext: HostContext) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #shouldSetTextContent(_type: Type, _props: Props) {
    // return true for elements, that only have a single text content.
    // currently only return false.
    return false;
  }

  #getRootHostContext(rootContainer: Container) {
    return rootContainer.hostContext;
  }

  #getChildHostContext(_parentHostContext: HostContext, _type: Type, rootContainer: Container) {
    return rootContainer.hostContext;
  }

  #getPublicInstance(instance: Instance) {
    return instance;
  }

  #prepareForCommit(_containerInfo: Container) {
    // noop but must return `null` to avoid issues related to node removal
    return null;
  }

  #resetAfterCommit(_containerInfo: Container) {
    // noop
  }

  #preparePortalMount(_containerInfo: Container) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #getCurrentEventPriority() {
    return DefaultEventPriority;
  }

  #getInstanceFromNode(_node: any): Fiber | null | undefined {
    debugger;
    throw new Error("Method not implemented.");
  }

  #beforeActiveInstanceBlur() {
    debugger;
    throw new Error("Method not implemented.");
  }

  #afterActiveInstanceBlur() {
    debugger;
    throw new Error("Method not implemented.");
  }

  #prepareScopeUpdate(_scopeInstance: any, _instance: any) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #getInstanceFromScope(_scopeInstance: any): null | Instance {
    debugger;
    throw new Error("Method not implemented.");
  }

  #detachDeletedInstance(_node: Instance) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #appendChild(_parentInstance: Instance, _child: Instance | TextInstance) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #appendChildToContainer(_container: Container, _child: Instance | TextInstance) {
    debugger;
    // container.append(child);
    throw new Error("Method not implemented.");
  }

  #insertBefore(_parentInstance: Instance, _child: Instance | TextInstance, _beforeChild: Instance | TextInstance) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #insertInContainerBefore(_container: Container, _child: Instance | TextInstance, _beforeChild: Instance | TextInstance) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #removeChild(_parentInstance: Instance, _child: Instance | TextInstance) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #removeChildFromContainer(_container: Container, _child: Instance | TextInstance) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #resetTextContent(_instance: Instance) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #commitTextUpdate(_textInstance: TextInstance, _oldText: string, _newText: string) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #commitMount(_instance: Instance, _type: Type, _props: Props, _internalInstanceHandle: OpaqueHandle) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #commitUpdate(_instance: Instance, _updatePayload: UpdatePayload, _type: Type, _prevProps: Props, _nextProps: Props, _internalHandle: OpaqueHandle) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #hideInstance(_instance: Instance) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #hideTextInstance(_textInstance: TextInstance) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #unhideInstance(_instance: Instance, _props: Props) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #unhideTextInstance(_textInstance: TextInstance, _text: string) {
    debugger;
    throw new Error("Method not implemented.");
  }

  #clearContainer(_container: Container) {
    debugger;
    // container.render();
    throw new Error("Method not implemented.");
  }

  render(children: React.ReactNode, callback?: () => void) {
    if (this.#internalRoot === null) {
      throw new Error("Cannot update an unmounted root.");
    }

    this.#reconciler.updateContainer(children, this.#internalRoot, null, callback);
  }
}

export const createRoot = (screen: Screen) => {
  return new TuiRoot(screen);
};
