/**
 * Source of truth for styling in Dining*v2
 * Holds the fonts and colors we use that
 * theme the app correctly.
 * 
 * Almost all components take advantage
 * of the constants below, so theming
 * should be uniform throughout the app.
 */

import { StyleSheet } from "react-native";
import RF from 'react-native-responsive-fontsize';

const fonts = {
    type: {
        primary: {
            regular: "Comfortaa Regular",
            bold: "Comfortaa Bold"
        },
        secondary: {
            regular: "Comfortaa Regular"
        }
    },
    size: {
        small: RF(2.6), 
        medium: RF(2.8), 
        large: RF(4), 
        extraLarge: RF(8),
    }
};

export const colors = {
    primary: "#4a86e8",  // a nice blue
    secondary: "#fff",   // white
    tertiary: "#000",    // black
    heart: "#ff6666"     // a nice pink ;)
};

const spacingSizes = {
    tiny: 5,
    small: 10,
    medium: 20
};

export default (styles = {
    font: {
        type: StyleSheet.create({
            primaryRegular: {
                fontFamily: fonts.type.primary.regular
            },
            primaryBold: {
                fontFamily: fonts.type.primary.bold
            },
            secondaryRegular: {
                fontFamily: fonts.type.secondary.regular
            }
        }),
        size: StyleSheet.create({
            small: {
                fontSize: fonts.size.small
            },
            moderate: {
                fontSize: fonts.size.moderate
            },
            medium: {
                fontSize: fonts.size.medium
            },
            large: {
                fontSize: fonts.size.large
            },
            extraLarge: {
                fontSize: fonts.size.extraLarge
            }
        }),
        color: StyleSheet.create({
            primary: {
                color: colors.primary
            },
            secondary: {
                color: colors.secondary
            },
            tertiary: {
                color: colors.tertiary
            }
        })
    },
    container: StyleSheet.create({
        withPadding: {
            margin: spacingSizes.medium
        },
        withPaddingSmall: {
            margin: spacingSizes.small
        },
        withPaddingTop: {
            paddingTop: spacingSizes.tiny,
        },
        withPaddingBottom: {
            paddingBottom: spacingSizes.tiny,
        },
        dropShadowLarge: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: spacingSizes.tiny,
            },
            shadowOpacity: 0.16,
            shadowRadius: 6.68,

            elevation: 11
        },
        dropShadowSmall: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.08,
            shadowRadius: 1.68,

            elevation: 2
        },
        backgroundColorPrimary: {
            backgroundColor: colors.primary
        },
        spaceAbove: {
            marginTop: spacingSizes.medium
        },
        spaceBelowSmall: {
            marginBottom: RF(2),
        },
        spaceBelow: {
            marginBottom: spacingSizes.medium
        },
        flexRow: {
            flexWrap: "wrap",
            alignItems: "center",
            flexDirection: "row"
        },
        center: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        },
    }),
    spacing: {
        around: StyleSheet.create({
            small: {
                margin: spacingSizes.small
            },
            medium: {
                margin: spacingSizes.medium
            }
        }),
        below: StyleSheet.create({
            medium: {
                marginBottom: spacingSizes.medium
            }
        }),
        above: StyleSheet.create({
            medium: {
                marginTop: spacingSizes.medium
            }
        })
    }
});

export const card = {
        ...styles.container.spaceBelowSmall,
        ...styles.container.flexRow,
        ...styles.container.dropShadowSmall,
        justifyContent: 'space-between',
        backgroundColor: colors.secondary,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: spacingSizes.medium,
        paddingHorizontal: spacingSizes.small,
        paddingVertical: 15
}
