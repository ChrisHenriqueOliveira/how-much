import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearTextGradient } from "react-native-text-gradient";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";

const { width, height } = Dimensions.get("window");

class Welcome extends Component {
  static navigationOptions = {
    headerShown: false
  };

    scrollX = new Animated.Value(0);

    state = {
      showTerms: false
    };

    renderTermsService() {
      return (
        <Modal
          animationType="slide"
          visible={this.state.showTerms}
          onRequestClose={() => this.setState({ showTerms: false })}
        >
          <Block
            padding={[theme.sizes.padding * 2, theme.sizes.padding]}
            space="between"
          >
            <Text h2 light>
              Termos de serviço
            </Text>
  
            <ScrollView style={{ marginVertical: theme.sizes.padding }}>
              <Text
                caption
                gray
                height={24}
                style={{ marginBottom: theme.sizes.base }}
              >
                1. Your use of the Service is at your sole risk. The service is
                provided on an "as is" and "as available" basis.
              </Text>
              <Text
                caption
                gray
                height={24}
                style={{ marginBottom: theme.sizes.base }}
              >
                2. Support for Expo services is only available in English, via
                e-mail.
              </Text>
              <Text
                caption
                gray
                height={24}
                style={{ marginBottom: theme.sizes.base }}
              >
                3. You understand that Expo uses third-party vendors and hosting
                partners to provide the necessary hardware, software, networking,
                storage, and related technology required to run the Service.
              </Text>
              <Text
                caption
                gray
                height={24}
                style={{ marginBottom: theme.sizes.base }}
              >
                4. You must not modify, adapt or hack the Service or modify
                another website so as to falsely imply that it is associated with
                the Service, Expo, or any other Expo service.
              </Text>
              <Text
                caption
                gray
                height={24}
                style={{ marginBottom: theme.sizes.base }}
              >
                5. You may use the Expo Pages static hosting service solely as
                permitted and intended to host your organization pages, personal
                pages, or project pages, and for no other purpose. You may not use
                Expo Pages in violation of Expo's trademark or other rights or in
                violation of applicable law. Expo reserves the right at all times
                to reclaim any Expo subdomain without liability to you.
              </Text>
              <Text
                caption
                gray
                height={24}
                style={{ marginBottom: theme.sizes.base }}
              >
                6. You agree not to reproduce, duplicate, copy, sell, resell or
                exploit any portion of the Service, use of the Service, or access
                to the Service without the express written permission by Expo.
              </Text>
              <Text
                caption
                gray
                height={24}
                style={{ marginBottom: theme.sizes.base }}
              >
                7. We may, but have no obligation to, remove Content and Accounts
                containing Content that we determine in our sole discretion are
                unlawful, offensive, threatening, libelous, defamatory,
                pornographic, obscene or otherwise objectionable or violates any
                party's intellectual property or these Terms of Service.
              </Text>
              <Text
                caption
                gray
                height={24}
                style={{ marginBottom: theme.sizes.base }}
              >
                8. Verbal, physical, written or other abuse (including threats of
                abuse or retribution) of any Expo customer, employee, member, or
                officer will result in immediate account termination.
              </Text>
              <Text
                caption
                gray
                height={24}
                style={{ marginBottom: theme.sizes.base }}
              >
                9. You understand that the technical processing and transmission
                of the Service, including your Content, may be transferred
                unencrypted and involve (a) transmissions over various networks;
                and (b) changes to conform and adapt to technical requirements of
                connecting networks or devices.
              </Text>
              <Text
                caption
                gray
                height={24}
                style={{ marginBottom: theme.sizes.base }}
              >
                10. You must not upload, post, host, or transmit unsolicited
                e-mail, SMSs, or "spam" messages.
              </Text>
            </ScrollView>
  
            <Block middle padding={[theme.sizes.base / 2, 0]}>
              <Button
                gradient
                onPress={() => this.setState({ showTerms: false })}
              >
                <Text center white>
                  Eu entendi
                </Text>
              </Button>
            </Block>
          </Block>
        </Modal>
      );
    }
    renderIllustrations() {
      const { illustrations } = this.props;
  
      return (
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={illustrations}
          extraDate={this.state}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({ item }) => (
            <Image
              source={item.source}
              resizeMode="contain"
              style={{ width, height: height / 2, overflow: "visible" }}
            />
          )}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { x: this.scrollX } }
            }
          ])}
        />
      );
    }
    renderSteps() {
      const { illustrations } = this.props;
      const stepPosition = Animated.divide(this.scrollX, width);
      return (
        <Block row center middle style={styles.stepsContainer}>
          {illustrations.map((item, index) => {
            const opacity = stepPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.4, 1, 0.4],
              extrapolate: "clamp"
            });
  
            return (
              <Block
                animated
                flex={false}
                key={`step-${index}`}
                color="gray"
                style={[styles.steps, { opacity }]}
              />
            );
          })}
        </Block>
      );
    }

    render() {
        const { navigation } = this.props;
    
        return (
          <Block style={{backgroundColor: 'white'}}>
            <StatusBar 
              barStyle='dark-content'
              hidden={false}
            />
            <Block center bottom flex={0.4}>
              <Image source={require("../assets/images/welcomeLogoText.png")} resizeMode="contain"
              style={{ width: '50%', }}></Image>
            </Block>
            <Block center middle>
              {this.renderIllustrations()}
              <Button onPress={() => ({})} style={{backgroundColor: 'transparent', bottom: 40}}>
                <Text center caption gray>
                  illustration by Ouch.pics
                </Text>
              </Button>
              {this.renderSteps()}
            </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                  <Button onPress={() => navigation.navigate()} style={styles.facebookLoginButton}>
                  <Icon name="facebook-f" style={styles.icon}></Icon>
                    <Text center semibold white>
                    LOGAR COM FACEBOOK
                    </Text>
                  </Button>
                  <Button shadow onPress={() => navigation.navigate("Browse")} style={styles.visitorLoginButton}>
                    <Text center semibold pink>
                    LOGAR COMO VISITANTE
                    </Text>
                  </Button>
                  <Button onPress={() => this.setState({ showTerms: true })} style={{backgroundColor: 'transparent'}}>
                    <Text center caption gray>
                      Termos de serviço
                    </Text>
                  </Button>
                </Block>
                {this.renderTermsService()}
          </Block>
        );
    }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/welcomeImage3.png") },
    { id: 2, source: require("../assets/images/welcomeImage2.png") },
    { id: 3, source: require("../assets/images/welcomeImage1.png") }
  ]
};

const styles = StyleSheet.create({
  icon: {
    left: 27,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
  },
  visitorLoginButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderColor: "rgba(233,51,84,1)",
    borderWidth: 1,
  },
  facebookLoginButton: {
    backgroundColor: 'rgba(29,85,197,1)',
  },
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 7,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  }
});

export default Welcome;
