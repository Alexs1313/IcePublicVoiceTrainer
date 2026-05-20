import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const icVceTrainrrHtmlWlcmLoader = `  <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            overflow: hidden;
          }

          body {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .loader {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 5px;
          }

          .loading-text {
            color: white;
            font-size: 14pt;
            font-weight: 600;
            margin-left: 10px;
            font-family: Arial, sans-serif;
          }

          .dot {
            margin-left: 3px;
            animation: blink 1.5s infinite;
          }

          .dot:nth-child(2) {
            animation-delay: 0.3s;
          }

          .dot:nth-child(3) {
            animation-delay: 0.6s;
          }

          .loading-bar-background {
            --height: 30px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 5px;
            width: 200px;
            height: var(--height);
            background-color: #212121;
            box-shadow: #0c0c0c -2px 2px 4px 0px inset;
            border-radius: calc(var(--height) / 2);
          }

          .loading-bar {
            position: relative;
            display: flex;
            justify-content: center;
            flex-direction: column;
            --height: 20px;
            width: 0%;
            height: var(--height);
            overflow: hidden;
            background: linear-gradient(
              0deg,
              rgba(222, 74, 15, 1) 0%,
              rgba(249, 199, 79, 1) 100%
            );
            border-radius: calc(var(--height) / 2);
            animation: loading 4s ease-out infinite;
          }

          .white-bars-container {
            position: absolute;
            display: flex;
            align-items: center;
            gap: 18px;
          }

          .white-bar {
            background: linear-gradient(
              -45deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 255, 255, 0) 70%
            );
            width: 10px;
            height: 45px;
            opacity: 0.3;
            transform: rotate(45deg);
          }

          @keyframes loading {
            0% {
              width: 0;
            }
            80% {
              width: 100%;
            }
            100% {
              width: 100%;
            }
          }

          @keyframes blink {
            0%,
            100% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }
        </style>
      </head>

      <body>
        <div class="loader">
          <div class="loading-text">
            Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
          </div>

          <div class="loading-bar-background">
            <div class="loading-bar">
              <div class="white-bars-container">
                <div class="white-bar"></div>
                <div class="white-bar"></div>
                <div class="white-bar"></div>
                <div class="white-bar"></div>
                <div class="white-bar"></div>
                <div class="white-bar"></div>
                <div class="white-bar"></div>
                <div class="white-bar"></div>
                <div class="white-bar"></div>
                <div class="white-bar"></div>
              </div>
            </div>
          </div>
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
