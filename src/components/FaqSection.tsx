import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';
import { getComponent } from '@stackbit/components';
import { mapStylesToClassNames as mapStyles } from '@stackbit/components/dist/utils/map-styles-to-class-names';


export default function FaqSection(props) {
    const cssId = props.elementId || null;
    const colors = props.colors || 'colors-a';
    const sectionStyles = props.styles?.self || {};
    const sectionBorderWidth = sectionStyles.borderWidth ? sectionStyles.borderWidth : 0;
    return (
        <div
            id={cssId}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-faq-section',
                colors,
                'flex',
                'flex-col',
                'justify-center',
                'relative',
                sectionStyles.height ? mapMinHeightStyles(sectionStyles.height) : null,
                sectionStyles.margin,
                sectionStyles.padding,
                sectionStyles.borderColor,
                sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null,
                sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : null
            )}
            style={{
                borderWidth: `${sectionBorderWidth}px`
            }}
        >
            <div className={classNames('flex', 'w-full', sectionStyles.justifyContent ? mapStyles({ justifyContent: sectionStyles.justifyContent }) : null)}>
                <div className={classNames('w-full', sectionStyles.width ? mapMaxWidthStyles(sectionStyles.width) : null)}>
                    {props.title && (
                        <h2 className={classNames(props?.styles?.title ? mapStyles(props?.styles?.title) : null)} data-sb-field-path=".title">
                            {props.title}
                        </h2>
                    )}
                    {props.subtitle && (
                        <p
                            className={classNames('text-lg', 'sm:text-xl', props?.styles?.subtitle ? mapStyles(props?.styles?.subtitle) : null, {
                                'mt-2': props.title
                            })}
                            data-sb-field-path=".subtitle"
                        >
                            {props.subtitle}
                        </p>
                    )}
                    {props.items && (
                        <div
                            className={classNames(mapColStyles(props?.columns || 3), { 'mt-12': props.title || props.subtitle })}
                            data-sb-field-path=".items"
                        >
                            {props.items.map((item, index) => (
                                <FaqItem key={index} {...item} data-sb-field-path={`.${index}`} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function FaqItem(props) {
    return (
        <div className="sb-faq-section-item" data-sb-field-path={props['data-sb-field-path']}>
            {props.question && (
                <h3 className={classNames(props?.styles?.question ? mapStyles(props?.styles?.question) : null)} data-sb-field-path=".title">
                    {props.question}
                </h3>
            )}
            {props.text && (
                <Markdown
                    options={{ forceBlock: true, forceWrapper: true }}
                    className={classNames('sb-markdown', props?.styles?.text ? mapStyles(props?.styles?.text) : null, {
                        'mt-4': props.title || props.subtitle
                    })}
                    data-sb-field-path=".text"
                >
                    {props.text}
                </Markdown>
            )}
        </div>
    );
}

function mapColStyles(columns) {
    switch (columns) {
        case 4:
            return 'md:grid-cols-4';
        case 3:
            return 'md:grid-cols-3';
        case 2:
            return 'md:grid-cols-2';
    }
    return null;
}

function mapMinHeightStyles(height) {
    switch (height) {
        case 'auto':
            return 'min-h-0';
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
