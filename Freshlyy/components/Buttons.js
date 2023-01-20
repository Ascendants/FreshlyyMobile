import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import Theme from '../constants/theme';

module.exports.Button = function (props) {
  let buttonBackground = [];
  let buttonText = [];
  switch (props.color) {
    case 'shadedPrimary':
      buttonBackground.push(styles.shadedPrimaryBackground);
      buttonText.push(styles.shadedPrimaryText);
      break;
    case 'filledPrimary':
      buttonBackground.push(styles.filledPrimaryBackground);
      buttonText.push(styles.filledPrimaryText);
      break;
    case 'shadedSecondary':
      buttonBackground.push(styles.shadedSecondaryBackground);
      buttonText.push(styles.shadedSecondaryText);
      break;
    case 'filledSecondary':
      buttonBackground.push(styles.filledSecondaryBackground);
      buttonText.push(styles.filledSecondaryText);
      break;
    case 'shadedTertiary':
      buttonBackground.push(styles.shadedTertiaryBackground);
      buttonText.push(styles.shadedTertiaryText);
      break;
    case 'filledTertiary':
      buttonBackground.push(styles.filledTertiaryBackground);
      buttonText.push(styles.filledTertiaryText);
      break;
    case 'shadedWarning':
      buttonBackground.push(styles.shadedWarningBackground);
      buttonText.push(styles.shadedWarningText);
      break;
    case 'filledWarning':
      buttonBackground.push(styles.filledWarningBackground);
      buttonText.push(styles.filledWarningText);
      break;
    case 'shadedDanger':
      buttonBackground.push(styles.shadedDangerBackground);
      buttonText.push(styles.shadedDangerText);
      break;
    case 'filledDanger':
      buttonBackground.push(styles.filledDangerBackground);
      buttonText.push(styles.filledBigButtonText);
      break;
  }
  switch (props.size) {
    case 'small':
      buttonBackground.push(styles.smallButtonBackground);
      buttonText.push(styles.smallButtonText);
      break;
    case 'normal':
      buttonBackground.push(styles.normalButtonBackground);
      buttonText.push(styles.normalButtonText);
      break;
    case 'big':
      buttonBackground.push(styles.bigButtonBackground);
      buttonText.push(styles.bigButtonText);
  }
  buttonBackground.push(props.backgroundStyle);
  buttonText.push(props.textStyle);
  let button = (
    <TouchableOpacity style={buttonBackground} onPress={props.onPress}>
      <Text style={buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
  if (props.type == 'icon') {
    button = (
      <TouchableOpacity
        style={[buttonBackground, styles.buttonIconBackground]}
        onPress={props.onPress}
      >
        {props.icon}
        <Text
          style={[
            buttonText,
            styles.buttonIconText,
            props.size == 'normal' ? styles.normalButtonIconText : null,
          ]}
        >
          {props.title}
        </Text>
      </TouchableOpacity>
    );
  }
  buttonBackground.push(props.backgroundStyle);
  buttonText.push(props.textStyle);
  return button;
};

const styles = StyleSheet.create({
  bigButtonText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    textAlign: 'center',
  },
  bigButtonBackground: {
    padding: 15,
    margin: 10,
    borderRadius: 18,
  },
  normalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  normalButtonBackground: {
    padding: 6,
    paddingHorizontal: 8,
    margin: 5,
    borderRadius: 12,
  },
  smallButtonText: {
    fontSize: 12,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
  },
  smallButtonBackground: {
    padding: 5,
    margin: 6,
    borderRadius: 10,
  },
  shadedBigButtonBackground: {
    backgroundColor: Theme.primaryShade,
  },
  shadedBigButtonText: {
    color: Theme.primary,
  },
  filledBigButtonBackground: {
    backgroundColor: Theme.primary,
  },
  filledBigButtonText: {
    color: Theme.contrastTextColor,
  },
  filledNormalButtonBackground: {
    padding: 2,
    width: '25%',
    borderRadius: 10,
    backgroundColor: Theme.primary,
    color: Theme.contrastTextColor,
  },
  filledNormalButtonText: {
    color: Theme.contrastTextColor,
  },
  greyButtonBackground: {
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Theme.overlay,
    padding: 5,
    marginHorizontal: 5,
  },
  shadedPrimaryBackground: {
    backgroundColor: Theme.primaryShade,
  },
  shadedPrimaryText: {
    color: Theme.primary,
  },
  filledPrimaryBackground: {
    backgroundColor: Theme.primary,
  },
  filledPrimaryText: {
    color: Theme.contrastTextColor,
  },
  shadedSecondaryBackground: {
    backgroundColor: Theme.secondaryShade,
  },
  shadedSecondaryText: {
    color: Theme.secondary,
  },
  filledSecondaryBackground: {
    backgroundColor: Theme.secondary,
  },
  filledSecondaryText: {
    color: Theme.contrastTextColor,
  },
  shadedTertiaryBackground: {
    backgroundColor: Theme.tertiaryShade,
  },
  shadedTertiaryText: {
    color: Theme.textColor,
  },
  filledTertiaryBackground: {
    backgroundColor: Theme.tertiary,
  },
  filledTertiaryText: {
    color: Theme.contrastTextColor,
  },
  shadedWarningBackground: {
    backgroundColor: Theme.warningShade,
  },
  shadedWarningText: {
    color: Theme.textColor,
  },
  filledWarningBackground: {
    backgroundColor: Theme.warning,
  },
  filledWarningText: {
    color: Theme.textColor,
  },
  shadedDangerBackground: {
    backgroundColor: Theme.dangerShade,
  },
  shadedDangerText: {
    color: Theme.danger,
  },
  filledDangerBackground: {
    backgroundColor: Theme.danger,
  },
  filledDangerText: {
    color: Theme.contrastTextColor,
  },
  buttonIconBackground: {
    borderRadius: 16,
    minHeight: 48,
    minWidth: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconText: {
    fontSize: 8,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  normalButtonIconText: {
    fontSize: 12,
  },
});

module.exports.BigButton = function (props) {
  return (
    <TouchableOpacity
      style={styles.bigButtonBackground}
      onPress={props.onPress}
    >
      <Text style={styles.bigButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};
module.exports.SmallSecondaryButton = function (props) {
  return (
    <TouchableOpacity
      style={[styles.greyButtonBackground]}
      onPress={props.onPress}
    >
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

module.exports.FilledBigButton = function (props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.bigButtonBackground, styles.filledBigButtonBackground]}
    >
      <Text style={[styles.bigButtonText, styles.filledBigButtonText]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

module.exports.FilledNormalButton = function (props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.filledNormalButtonBackground}
    >
      <Text style={styles.filledNormalButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

module.exports.ShadedBigButton = function (props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.bigButtonBackground, styles.shadedBigButtonBackground]}
    >
      <Text style={[styles.bigButtonText, styles.shadedBigButtonText]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
