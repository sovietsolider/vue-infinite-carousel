interface Props {
    speed?: number;
    gap?: number;
    direction?: "left" | "right";
    initialTranslate?: number;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {
            key: number;
        }): any;
    };
    refs: {
        container: HTMLDivElement;
        scrollContent: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    speed: number;
    gap: number;
    direction: "left" | "right";
    initialTranslate: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
