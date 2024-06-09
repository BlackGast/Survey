import React from 'react';
import { ILayoutProps } from './ILayoutProps';
import { ILayoutState } from './ILayoutState';
import classes from './Layout.module.scss';

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);
        this.state = {};
    }
    public render(): React.ReactNode {
        const { children } = this.props;
        return (
            <div className={classes.root}>
                {children}
            </div>
        );
    }
}