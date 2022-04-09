import moment from 'moment';
import React, {useMemo, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import * as Component from '../components';
import {actions} from '../redux';
import homeStyles from '../styles/home';
import {
  appTypes,
  transactionTypes,
  storeTypes,
  modalTypes,
  snackbarTypes,
  selectTypes,
} from '../types';
import {colors, helpers} from '../utils';
import {Appbar, Button, Card, Colors, IconButton} from 'react-native-paper';
import useTotal from '../hooks/useTotal';
import {useFilter, useMode, useSelect} from '../hooks';

export default function Home() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [total, symbol] = useTotal();
  const [totalMonth] = useTotal({
    dateRangeFrom: moment().startOf('month').format('YYYY-MM-DD hh:mm'),
    dateRangeTo: moment().endOf('month').format('YYYY-MM-DD hh:mm'),
  });

  const {transactions, status} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const search = useSelector((state: storeTypes.RootState) => state.search);

  // Used in select mode
  const CardRight = () => {
    return (
      <Card.Actions>
        <Button
          labelStyle={{
            color: colors.text,
            fontSize: 11,
          }}
          onPress={() =>
            navigation.navigate('Transactions', {screen: 'TransactionsScreen'})
          }>
          VIEW ALL
        </Button>
      </Card.Actions>
    );
  };

  // clean up modals
  return (
    <React.Fragment>
      <Appbar.Header style={{backgroundColor: colors.primary}} dark={false}>
        <Appbar.Content title="Overview" />
        <Appbar.Action
          icon="plus"
          onPress={() =>
            dispatch(actions.modal.setVisible(modalTypes.ModalVisible.ADD))
          }
        />
      </Appbar.Header>
      <ScrollView
        scrollEnabled={!search.isFocused}
        style={{flex: 1, backgroundColor: Colors.grey100}}>
        <React.Fragment>
          {status === appTypes.Status.SUCCESS &&
          transactions &&
          transactions.length === 0 ? (
            <View style={homeStyles.container}>
              <Text style={homeStyles.p}>
                Looks like you have no transactions...
              </Text>
              <Text style={homeStyles.p}>Go buy something!</Text>
              <View style={homeStyles.bagIcon}>
                <FontAwesome5Icon
                  name="shopping-bag"
                  size={50}
                  color={colors.secondary}
                />
              </View>
            </View>
          ) : (
            <View style={{paddingTop: 100}}>
              <Component.Gradient.Rectangle>
                <Card
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomEndRadius: 16,
                    borderBottomStartRadius: 16,
                    borderTopEndRadius: 16,
                    borderTopStartRadius: 16,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginHorizontal: 10,
                    marginBottom: 13,
                    marginTop: 26,
                  }}
                  elevation={0}>
                  <Card.Title
                    title="At a glance"
                    titleStyle={{
                      color: colors.secondaryHighlight,
                      fontSize: 40,
                      fontWeight: '300',
                      marginBottom: 10,
                      paddingVertical: 10,
                    }}
                  />
                  <Card.Content
                    style={{
                      paddingHorizontal: 16,
                    }}>
                    <View
                      style={{
                        marginBottom: 20,
                      }}>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 22,
                          fontWeight: '200',
                        }}>
                        Total expense
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 28,
                          fontWeight: '200',
                        }}>
                        {symbol}
                        {total.toLocaleString()}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 22,
                          fontWeight: '200',
                        }}>
                        This month
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 26,
                          fontWeight: '200',
                        }}>
                        {symbol}
                        {totalMonth.toLocaleString()}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              </Component.Gradient.Rectangle>
              <View
                style={{
                  marginHorizontal: 20,
                }}>
                <Card
                  style={{
                    marginVertical: 20,
                    paddingBottom: 16,
                  }}>
                  <Card.Title
                    title="Recent"
                    style={{
                      backgroundColor: colors.background,
                    }}
                    titleStyle={{
                      color: colors.title,
                      marginLeft: 5,
                      fontSize: 22,
                      fontWeight: '300',
                    }}
                    rightStyle={{marginTop: 3}}
                    right={() => <CardRight />}
                  />
                  <Component.Transactions limit={3} ignoreFilter={true} />
                </Card>
                <Card style={{paddingBottom: 16, marginBottom: 30}}>
                  <Card.Title
                    title="By payment method"
                    style={{
                      backgroundColor: colors.background,
                    }}
                    titleStyle={{
                      color: colors.title,
                      marginLeft: 5,
                      fontSize: 22,
                      fontWeight: '300',
                    }}
                    right={() => (
                      <Card.Actions>
                        <Button
                          labelStyle={{
                            color: colors.text,
                            fontSize: 11,
                          }}
                          onPress={() =>
                            navigation.navigate('TransactionsScreen')
                          }>
                          VIEW ALL
                        </Button>
                      </Card.Actions>
                    )}
                  />
                  <Component.Category
                    title="Cash"
                    category={transactionTypes.PaymentMethod.CASH}
                    icon="cash"
                  />
                  <Component.Category
                    title="Credit"
                    category={transactionTypes.PaymentMethod.CREDIT}
                    icon="credit-card-outline"
                  />
                  <Component.Category
                    title="Debit"
                    category={transactionTypes.PaymentMethod.DEBIT}
                    icon="bank-outline"
                  />
                  <Component.Category
                    title="Check"
                    category={transactionTypes.PaymentMethod.CHECK}
                    icon="checkbook"
                  />
                  <Component.Category
                    title="Other"
                    category={transactionTypes.PaymentMethod.OTHER}
                    icon="hand-coin-outline"
                  />
                </Card>
              </View>
            </View>
          )}
        </React.Fragment>
      </ScrollView>
      <Component.Search containerBackgroundColor={colors.altBackground} />
    </React.Fragment>
  );
}
