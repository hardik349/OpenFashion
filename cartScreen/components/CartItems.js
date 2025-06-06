import React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {increaseQuantity, decreaseQuantity} from '../../store/slice/cartSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const CartItems = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  console.log(cartItems);
  const navigation = useNavigation();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <View
        style={{
          width: 120,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.name2}>Recycle Boucle Knit Cardigan Pink</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 15,
          }}>
          <TouchableOpacity
            onPress={() => dispatch(decreaseQuantity({name: item.name}))}>
            <View
              style={{
                width: 27,
                height: 27,
                borderRadius: 15,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}>
              <AntDesign name="minus" size={12} />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'TenorSans-Regular',
              marginRight: 20,
            }}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={() => dispatch(increaseQuantity({name: item.name}))}>
            <View
              style={{
                width: 27,
                height: 27,
                borderRadius: 15,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons name="add" size={12} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.titleText}>CHECKOUT</Text>
      <Image
        source={require('../../assests/images/designNewArrival.png')}
        style={{width: 150, height: 15, marginBottom: 30}}
      />
      <View style={styles.scrollContainer}>
        <ScrollView>
          {cartItems.length === 0 ? (
            <Text style={styles.emptyText}>Your cart is empty</Text>
          ) : (
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={index => index.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginRight: 90,
              marginTop: 10,
            }}>
            <Image
              source={require('../../assests/images/cartscreen/Voucher.png')}
              style={{width: 34, height: 33}}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'TenorSans-Regular',
                opacity: 0.7,
                marginRight: 30,
              }}>
              Add promo code
            </Text>
          </View>

          <View
            style={{
              marginTop: 15,
              borderWidth: 0.4,
              width: 350,
              borderColor: '#BABABA',
            }}
          />

          <TouchableOpacity onPress={() => navigation.navigate('Delivery')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginRight: 20,
                marginTop: 15,
              }}>
              <Image
                source={require('../../assests/images/cartscreen/delivery.png')}
                style={{width: 28, height: 35}}
              />
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 20,
                  fontFamily: 'TenorSans-Regular',
                  opacity: 0.7,
                  marginRight: 30,
                }}>
                Delivery
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 20,
                  fontFamily: 'TenorSans-Regular',
                  opacity: 0.3,
                  marginLeft: 90,
                }}>
                Free
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 15,
              borderWidth: 0.4,
              width: 350,
              borderColor: '#BABABA',
            }}
          />
        </ScrollView>
      </View>

      <View style={{width: '100%', marginTop: 50}}>
        <View
          style={{
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'TenorSans-Regular',
              letterSpacing: 1,
            }}>
            EST. TOTAl
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'TenorSans-Regular',
              letterSpacing: 1,
              color: 'red',
            }}>
            ${totalPrice}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#000',
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'TenorSans-Regular',
              letterSpacing: 1,
              color: 'white',
            }}>
            CHECKOUT
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    height: 500, // Adjust as needed (40% of screen height)
    width: '100%',
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    opacity: 0.6,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 0.7,
    borderBottomColor: '#BABABA',
    paddingBottom: 20,
  },
  image: {
    width: 120,
    height: 150,
    marginRight: 12,
  },
  details: {
    justifyContent: 'center',
    flexShrink: 1,
    marginLeft: 5,
    marginBottom: 40,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'TenorSans-Regular',
  },
  name2: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
    opacity: 0.5,
    fontFamily: 'TenorSans-Regular',
  },
  price: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
    fontFamily: 'TenorSans-Regular',
  },
  titleText: {
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: 'TenorSans-Regular',
    marginTop: 20,
  },
});
