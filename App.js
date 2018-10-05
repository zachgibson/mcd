import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import { BlurView } from 'expo';
import Animated, { Easing } from 'react-native-reanimated';

import Foo from './Foo';

const {
    ScrollView,
    Value,
    View,
    abs,
    set,
    block,
    cond,
    clockRunning,
    startClock,
    stopClock,
    debug,
    spring,
    eq
} = Animated;
const { width, height } = Dimensions.get('window');
const TILE_WIDTH = 136;
const TILE_HEIGHT = 232;

const DATA_SET_1 = [
    {
        uri: require('./images/deadmau5.jpg'),
        firstName: 'Deadmau5',
        lastName: ''
    },
    {
        uri: require('./images/judy-blume.jpg'),
        firstName: 'Judy',
        lastName: 'Blume'
    },
    {
        uri: require('./images/james-patterson.jpg'),
        firstName: 'James',
        lastName: 'Patterson'
    },
    {
        uri: require('./images/spike-lee.jpg'),
        firstName: 'Spike',
        lastName: 'Lee'
    },
    {
        uri: require('./images/christina-aguilera.jpg'),
        firstName: 'Christina',
        lastName: 'Aguilera'
    },
    {
        uri: require('./images/martin-scorsese.jpg'),
        firstName: 'Martin',
        lastName: 'Scorsese'
    },
    {
        uri: require('./images/shonda-rhimes.jpg'),
        firstName: 'Shonda',
        lastName: 'Rhimes'
    },
    {
        uri: require('./images/aaron-sorkin.jpg'),
        firstName: 'Aaron',
        lastName: 'Sorkin'
    }
];

const DATA_SET_2 = [
    {
        uri: require('./images/marc-jacobs.jpg'),
        firstName: 'Marc',
        lastName: 'Jacobs'
    },
    {
        uri: require('./images/r-l-stine.jpg'),
        firstName: 'R.L.',
        lastName: 'Stine'
    },
    {
        uri: require('./images/chris-hadfield.jpg'),
        firstName: 'Chris',
        lastName: 'Hadfield'
    },
    {
        uri: require('./images/gordon-ramsay.jpg'),
        firstName: 'Gordon',
        lastName: 'Ramsay'
    },
    {
        uri: require('./images/annie-leibovitz.jpg'),
        firstName: 'Annie',
        lastName: 'Leibovitz'
    },
    {
        uri: require('./images/daniel-negreanu.jpg'),
        firstName: 'Daniel',
        lastName: 'Negreanu'
    },
    {
        uri: require('./images/garry-kasparov.jpg'),
        firstName: 'Garry',
        lastName: 'Kasparov'
    },
    {
        uri: require('./images/frank-gehry.jpg'),
        firstName: 'Frank',
        lastName: 'Gehry'
    }
];

const DATA_SET_3 = [
    {
        uri: require('./images/samuel-l-jackson.jpg'),
        firstName: 'Samuel L.',
        lastName: 'Jackson'
    },
    {
        uri: require('./images/ken-burns.jpg'),
        firstName: 'Ken',
        lastName: 'Burns'
    },
    {
        uri: require('./images/margaret-atwood.jpg'),
        firstName: 'Margaret',
        lastName: 'Atwood'
    },
    {
        uri: require('./images/stephen-curry.jpg'),
        firstName: 'Stephen',
        lastName: 'Curry'
    },
    {
        uri: require('./images/malcolm-gladwell.jpg'),
        firstName: 'Malcolm',
        lastName: 'Gladwell'
    },
    {
        uri: require('./images/thomas-keller.jpg'),
        firstName: 'Thomas',
        lastName: 'Keller'
    },
    {
        uri: require('./images/helen-mirren.jpg'),
        firstName: 'Helen',
        lastName: 'Mirren'
    },
    {
        uri: require('./images/herbie-hancock.jpg'),
        firstName: 'Herbie',
        lastName: 'Hancock'
    }
];
const DATA_SET_4 = [
    {
        uri: require('./images/steve-martin.jpg'),
        firstName: 'Steve',
        lastName: 'Martin'
    },
    {
        uri: require('./images/hans-zimmer.jpg'),
        firstName: 'Hans',
        lastName: 'Zimmer'
    },
    {
        uri: require('./images/armin-van-buuren.jpg'),
        firstName: 'Armin Van',
        lastName: 'Buuren'
    },
    {
        uri: require('./images/alice-waters.jpg'),
        firstName: 'Alice',
        lastName: 'Waters'
    },
    {
        uri: require('./images/ron-howard.jpg'),
        firstName: 'Ron',
        lastName: 'Howard'
    },
    {
        uri: require('./images/david-mamet.jpg'),
        firstName: 'David',
        lastName: 'Mamet'
    },
    {
        uri: require('./images/dr-jane-goodall.jpg'),
        firstName: 'Dr. Jane',
        lastName: 'Goodall'
    },
    {
        uri: require('./images/wolfgang-puck.jpg'),
        firstName: 'Wolfgang',
        lastName: 'Puck'
    }
];

const DATA_SET_5 = [
    {
        uri: require('./images/diane-von-furstenberg.jpg'),
        firstName: 'Diane Von',
        lastName: 'Furstenberg'
    },
    {
        uri: require('./images/bob-woodward.jpg'),
        firstName: 'Bob',
        lastName: 'Woodward'
    },
    {
        uri: require('./images/judd-apatow.jpg'),
        firstName: 'Judd',
        lastName: 'Apatow'
    },
    {
        uri: require('./images/serena-williams.jpg'),
        firstName: 'Serena',
        lastName: 'Williams'
    },
    {
        uri: require('./images/werner-herzog.jpg'),
        firstName: 'Werner',
        lastName: 'Herzog'
    },
    {
        uri: require('./images/usher.jpg'),
        firstName: 'usher',
        lastName: ''
    },
    {
        uri: require('./images/reba-mcentire.jpg'),
        firstName: 'Reba',
        lastName: 'Mcentire'
    },
    {
        uri: require('./images/stephen-king.jpg'),
        firstName: 'Stephen',
        lastName: 'King'
    }
];

function runSpring(clock, value, dest) {
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0)
    };

    const config = {
        toValue: new Value(0),
        damping: 10,
        mass: 5,
        stiffness: 101.6,
        overshootClamping: false,
        restSpeedThreshold: 1,
        restDisplacementThreshold: 1
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.velocity, -2500),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        spring(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

const DebugTile = () => (
    <View
        pointerEvents="none"
        style={{
            position: 'absolute',
            top: height / 2 - TILE_HEIGHT / 2,
            left: width / 2 - TILE_WIDTH / 2,
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
            borderWidth: 3,
            borderColor: 'lime',
            borderStyle: 'dashed'
        }}
    />
);

const DebugCrosshair = ({ strokeWidth = 2 }) => (
    <View
        pointerEvents="none"
        style={{
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <View
            style={{
                width: strokeWidth,
                height,
                backgroundColor: 'lime'
            }}
        />
        <View
            style={{
                position: 'absolute',
                top: height / 2 - strokeWidth / 2,
                width,
                height: strokeWidth,
                backgroundColor: 'lime'
            }}
        />
    </View>
);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.x = new Value(0);
        this.y = new Value(0);
        this.lastX = new Value(0);
        this.lastY = new Value(0);
        this.deltaX = new Value(0);
        this.deltaY = new Value(0);

        this.onScroll = Animated.event([
            {
                nativeEvent: ({ contentOffset }) =>
                    block([
                        set(this.lastX, this.x),
                        set(this.lastY, this.y),
                        set(this.x, contentOffset.x),
                        set(this.y, contentOffset.y),
                        cond(
                            eq(abs(contentOffset.x), abs(this.lastX)),
                            set(this.deltaX, 0),
                            set(this.deltaX, contentOffset.x)
                        ),
                        cond(
                            eq(abs(contentOffset.y), abs(this.lastY)),
                            set(this.deltaY, 0),
                            set(this.deltaY, contentOffset.y)
                        )
                    ])
            }
        ]);

        // this.animatedScrollView;

        // this.handlePress = (top, left) => {
        //     this.animatedScrollView._component.scrollTo({
        //         x: left - (width / 2 - TILE_WIDTH / 2),
        //         y: top - (height / 2 - TILE_HEIGHT / 2),
        //         animated: true
        //     });
        // };
    }

    render() {
        const numberOfRows = 5;
        const startingPointTop = height / 2 - TILE_HEIGHT / 2;
        const startingPointLeft = width / 2 - TILE_WIDTH / 2;

        const scrollViewWidth =
            DATA_SET_1.length * TILE_WIDTH +
            startingPointLeft * 2 +
            (DATA_SET_1.length - 1) * 24;
        const scrollViewHeight =
            numberOfRows * TILE_HEIGHT +
            startingPointTop * 2 +
            (numberOfRows - 1) * 24;

        return (
            <View
                style={[
                    styles.container,
                    {
                        transform: [
                            {
                                // scale: this.scrollViewScale
                            }
                        ]
                    }
                ]}
            >
                <ScrollView
                    onMomentumScrollEnd={this.onMomentumScrollEnd}
                    onScrollEndDrag={this.onScrollEndDrag}
                    scrollEventThrottle={1}
                    onScroll={this.onScroll}
                    ref={ref => {
                        this.animatedScrollView = ref;
                    }}
                    // snapToInterval={24 + TILE_WIDTH}
                >
                    <View
                        style={{
                            width: scrollViewWidth,
                            height: scrollViewHeight
                        }}
                    />
                    {DATA_SET_1.map((master, i) => (
                        <Foo
                            key={i}
                            top={startingPointTop}
                            left={startingPointLeft + (TILE_WIDTH + 24) * i}
                            x={this.x}
                            y={this.y}
                            deltaX={this.deltaX}
                            deltaY={this.deltaY}
                            imageSrc={master.uri}
                            firstName={master.firstName}
                            lastName={master.lastName}
                        />
                    ))}
                    {DATA_SET_2.map((master, i) => (
                        <Foo
                            key={i}
                            top={startingPointTop + TILE_HEIGHT + 24}
                            left={startingPointLeft + (TILE_WIDTH + 24) * i}
                            x={this.x}
                            y={this.y}
                            deltaX={this.deltaX}
                            deltaY={this.deltaY}
                            imageSrc={master.uri}
                            firstName={master.firstName}
                            lastName={master.lastName}
                        />
                    ))}
                    {DATA_SET_3.map((master, i) => (
                        <Foo
                            key={i}
                            top={startingPointTop + (TILE_HEIGHT + 24) * 2}
                            left={startingPointLeft + (TILE_WIDTH + 24) * i}
                            x={this.x}
                            y={this.y}
                            deltaX={this.deltaX}
                            deltaY={this.deltaY}
                            imageSrc={master.uri}
                            firstName={master.firstName}
                            lastName={master.lastName}
                        />
                    ))}
                    {DATA_SET_4.map((master, i) => (
                        <Foo
                            key={i}
                            top={startingPointTop + (TILE_HEIGHT + 24) * 3}
                            left={startingPointLeft + (TILE_WIDTH + 24) * i}
                            x={this.x}
                            y={this.y}
                            deltaX={this.deltaX}
                            deltaY={this.deltaY}
                            imageSrc={master.uri}
                            firstName={master.firstName}
                            lastName={master.lastName}
                        />
                    ))}
                    {DATA_SET_5.map((master, i) => (
                        <Foo
                            key={i}
                            top={startingPointTop + (TILE_HEIGHT + 24) * 4}
                            left={startingPointLeft + (TILE_WIDTH + 24) * i}
                            x={this.x}
                            y={this.y}
                            deltaX={this.deltaX}
                            deltaY={this.deltaY}
                            imageSrc={master.uri}
                            firstName={master.firstName}
                            lastName={master.lastName}
                        />
                    ))}
                </ScrollView>
                <BlurView
                    tint="dark"
                    intensity={100}
                    style={styles.changeViewIconsContainer}
                >
                    <Image
                        style={styles.changeViewIcons}
                        source={require('./change-view-icons.png')}
                    />
                </BlurView>
                <Image style={styles.tabbar} source={require('./tabbar.png')} />
            </View>
        );
    }
}
// <DebugCrosshair />

// <DebugTile />
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    name: {
        fontWeight: '500',
        color: 'white'
        // textTransform: 'uppercase'
    },
    tabbar: {
        position: 'absolute',
        bottom: 0,
        width,
        height: 120
    },
    changeViewIconsContainer: {
        position: 'absolute',
        top: 80,
        left: 24,
        padding: 12,
        borderRadius: 8
        // width: 57 + 32,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    changeViewIcons: {
        width: 57
    }
});

// {arr1.map((master, i) => (
//     <Foo
//         key={i}
//         // onPress={(top, left) => this.handlePress(top, left)}
//         top={startingPointTop + TILE_HEIGHT * 2 + 24 * 2}
//         left={startingPointLeft + (TILE_WIDTH + 24) * i}
//         x={this.x}
//         y={this.y}
//         deltaX={this.deltaX}
//         deltaY={this.deltaY}
//         imageSrc={master.imageSrc}
//         firstName={master.firstName}
//         lastName={master.lastName}
//     />
// ))}
