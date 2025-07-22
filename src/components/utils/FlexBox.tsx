import type { 
    AlignItems, 
    FlexDirection, 
    FlexGap, 
    FlexWrap, 
    GenericProps, 
    JustifyContent 
} from "@/types";

export interface FlexBoxProps extends GenericProps {
    direction?: FlexDirection
    justify?: JustifyContent,
    align?: AlignItems,
    wrap?: FlexWrap,
    gap?: FlexGap,
}

export default function FlexBox ({ 
    children,
    direction = 'row',
    justify = 'start',
    align = 'stretch',
    wrap = 'nowrap',
    gap = 0,
    className = '',
    as: Component = 'div',
    ...props 
}: FlexBoxProps) {


    const directionMap: Record<FlexDirection, string> = {
        'row': 'flex-row',
        'row-reverse': 'flex-row-reverse',
        'col': 'flex-col',
        'column': 'flex-col',
        'col-reverse': 'flex-col-reverse',
        'column-reverse': 'flex-col-reverse'
    };

    const justifyMap: Record<JustifyContent, string> = {
        'start': 'justify-start',
        'end': 'justify-end',
        'center': 'justify-center',
        'between': 'justify-between',
        'around': 'justify-around',
        'evenly': 'justify-evenly'
    };

    const alignMap: Record<AlignItems, string> = {
        'start': 'items-start',
        'end': 'items-end',
        'center': 'items-center',
        'baseline': 'items-baseline',
        'stretch': 'items-stretch'
    };

    const wrapMap: Record<FlexWrap, string> = {
        'nowrap': 'flex-nowrap',
        'wrap': 'flex-wrap',
        'wrap-reverse': 'flex-wrap-reverse'
    };

    const gapMap: Record<FlexGap, string> = {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        5: 'gap-5',
        6: 'gap-6',
        8: 'gap-8',
        10: 'gap-10',
        12: 'gap-12',
        16: 'gap-16'
    };

    const classes = [
        'flex',
        directionMap[direction as FlexDirection],
        justifyMap[justify as JustifyContent] ,
        alignMap[align as AlignItems],
        wrapMap[wrap as FlexWrap],
        typeof gap === 'number' ? gapMap[gap] : gap,
        className
    ].filter(Boolean).join(' ');

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
};