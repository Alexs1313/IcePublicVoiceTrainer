import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const icVceTrainrrHtmlWlcmLoader = ` <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
      <style>
        body {
          margin: 0;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          --color: hsl(0, 0%, 87%);
          --animation: 2s ease-in-out infinite;
        }

        .circle {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 20px;
          height: 20px;
          border: solid 2px var(--color);
          border-radius: 50%;
          margin: 0 10px;
          background-color: transparent;
          animation: circle-keys var(--animation);
        }

        .dot {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: var(--color);
          animation: dot-keys var(--animation);
        }

        .outline {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          animation: outline-keys var(--animation);
        }

        .circle:nth-child(2) { animation-delay: 0.3s; }
        .circle:nth-child(3) { animation-delay: 0.6s; }
        .circle:nth-child(4) { animation-delay: 0.9s; }

        .circle:nth-child(2) .dot { animation-delay: 0.3s; }
        .circle:nth-child(3) .dot { animation-delay: 0.6s; }
        .circle:nth-child(4) .dot { animation-delay: 0.9s; }

        .circle:nth-child(1) .outline { animation-delay: 0.9s; }
        .circle:nth-child(2) .outline { animation-delay: 1.2s; }
        .circle:nth-child(3) .outline { animation-delay: 1.5s; }
        .circle:nth-child(4) .outline { animation-delay: 1.8s; }

        @keyframes circle-keys {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes dot-keys {
          0% { transform: scale(1); }
          50% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        @keyframes outline-keys {
          0% {
            transform: scale(0);
            outline: solid 20px var(--color);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            outline: solid 0 transparent;
            opacity: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="loader">
        <div class="circle"><div class="dot"></div><div class="outline"></div></div>
        <div class="circle"><div class="dot"></div><div class="outline"></div></div>
        <div class="circle"><div class="dot"></div><div class="outline"></div></div>
        <div class="circle"><div class="dot"></div><div class="outline"></div></div>
      </div>
    </body>
  </html>`;

const IcVceTrainrrLoader = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('IcVceTrainrrOnboarding' as never);
    }, 6315);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrainload.png')}
      style={icVceTrainrrStyles.icVceTrainrrImageBg}>
      <ScrollView
        contentContainerStyle={icVceTrainrrStyles.icVceTrainrrScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={icVceTrainrrStyles.bottomWrap}>
          <WebView
            source={{html: icVceTrainrrHtmlWlcmLoader}}
            scrollEnabled={false}
            originWhitelist={['*']}
            style={{width: 260, height: 90, backgroundColor: 'transparent'}}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default IcVceTrainrrLoader;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrImageBg: {
    flex: 1,
  },
  icVceTrainrrScrollContent: {
    flexGrow: 1,
  },

  bottomWrap: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingBottom: 40.12,
  },
});
