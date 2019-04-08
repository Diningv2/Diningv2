import React from 'react';
import posed, {Transition} from 'react-native-pose';

const ListItem = posed.View({
    enter: { 
        opacity: 1, 
        y: 0,
        transition: ({ i }) => ({
            delay: i * 100 , 
            duration: 300,
            type: 'spring'}),
    },
    exit: { 
        opacity: 0, 
        y: 50
    },
    props: { i : 0 }
  });

export class AnimatedListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Transition animateOnMount>
                <ListItem key={0} i={this.props.index || 0}>
                    {this.props.children}
                </ListItem>
            </Transition>
        )
    }
}