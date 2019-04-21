import { StyleSheet } from "react-native";

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
        small: 10,
        moderate: 17,
        medium: 20,
        large: 30
    }
};

export const colors = {
    primary: "#4a86e8",
    secondary: "#fff",
    tertiary: "#000"
};

const spacingSizes = {
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
            margin: 20
        },
        withPaddingSmall: {
            margin: spacingSizes.small
        },
        dropShadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5
            },
            shadowOpacity: 0.16,
            shadowRadius: 6.68,

            elevation: 11
        },
        backgroundColorPrimary: {
            backgroundColor: colors.primary
        },
        spaceAbove: {
            marginTop: 20
        },
        spaceBelow: {
            marginBottom: 20
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
        }
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
    },
    topTabs: StyleSheet.create({
        withPaddingTop: {
            paddingTop: 5
        },
        withPaddingBottom: {
            paddingBottom: 5
        }
    })
});
