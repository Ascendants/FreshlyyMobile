import React from 'react';
import { StyleSheet, View, Image, ScrollView, Settings } from 'react-native';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import { TextInputBox, SelectList } from '../../components/Inputs';
import { H3, P } from '../../components/Texts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import CardTypeSelector from '../../components/CardTypeSelector';
import ENV from '../../constants/env';
import LoadingModal from '../../components/LoadingModal';

export default function ({ navigation, route }) {
  const [submitting, setSubmitting] = React.useState(false);
  const [pickingBank, setPickingBank] = React.useState(false);
  const [banks, setBanks] = React.useState([]);
  const [bank, setBank] = React.useState({});

  const BankSchema = Yup.object().shape({
    AccountName: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    AccountNumber: Yup.string()
      .matches(new RegExp(bank.BankAccountNumFormat), 'Invalid Account Number')
      .required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      AccountName: '',
      AccountNumber: '',
    },
    validationSchema: BankSchema,
  });
  React.useEffect(() => {
    fetch(ENV.backend + '/farmer/get-banks/', {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBanks(res.banks);
      })
      .catch((err) => console.log(err));
  }, []);

  async function submit() {
    formik.validateForm();
    Object.keys(formik.values).forEach((value) => {
      formik.setFieldTouched(value);
    });
    if (!Object.keys(formik.touched).length) return;
    for (let error in formik.errors) if (error) return;
    const data = formik.values;
    data.bankId = bank._id;
    setSubmitting(true);
    fetch(ENV.backend + '/farmer/save-account/', {
      method: 'POST',
      headers: {
        Authorization: route.params.auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') throw new Error('Something went wrong');
        navigation.navigate('Message', {
          type: 'Success',
          messageTitle: 'Account Saved!',
          messageText: 'The account has been saved securely',
          goto: 'Farmer Balance',
          goButtonText: 'Go to Earnings',
        });
        setSubmitting(false);
      })
      .catch((err) => {
        setSubmitting(false);
        navigation.navigate('Message', {
          type: 'fail',
          messageTitle: 'Account could not be saved :(',
          messageText: 'Something went wrong.',
          goto: 'Farmer Earnings',
          goButtonText: 'Go Back',
        });
        console.log(err);
        return;
      });
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal visible={submitting} message='Saving' />
        <Header back={true} home={true} />
        <H3 style={{ textAlign: 'center' }}>Bank Details</H3>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <Image
              source={require('../../assets/vault.png')}
              style={styles.vectorimage}
            />
            <View style={{ width: '100%' }}>
              <SelectList
                setSelected={(item) => {
                  const b = banks.find((a) => a._id == item);
                  if (b) {
                    setBank(b);
                  }
                }}
                data={banks?.map((a) => {
                  return {
                    value: a.BankName,
                    key: a._id,
                    ...a,
                  };
                })}
                save='key'
                value={bank}
                placeholder='-- Select Bank'
                notFoundText='No bank found'
                searchPlaceholder='Search bank...'
              />
            </View>
            <H3 style={styles.bankName}>{bank.BankName}</H3>
            {bank.BankName && (
              <>
                <TextInputBox
                  inputlabel='Account Holder Name'
                  placeholder='Enter name'
                  name='AccountName'
                  onChangeText={formik.handleChange('AccountName')}
                  onBlur={() =>
                    formik.setFieldTouched('AccountName', true, true)
                  }
                  value={formik.values.AccountName}
                  error={formik.errors.AccountName}
                  touched={formik.touched.AccountName}
                />
                <TextInputBox
                  inputlabel='Account Number'
                  placeholder='Enter account number'
                  name='AccountNumber'
                  value={formik.values.AccountNumber}
                  onChangeText={formik.handleChange('AccountNumber')}
                  error={formik.errors.AccountNumber}
                  onBlur={() =>
                    formik.setFieldTouched('AccountNumber', true, true)
                  }
                  touched={formik.touched.AccountNumber}
                />
                <Button
                  title='Save Account'
                  color='filledWarning'
                  size='big'
                  onPress={submit}
                />
                <P style={{ color: Theme.danger }}>
                  {!formik.isValid &&
                  Object.keys(formik.touched).length ==
                    Object.keys(formik.values).length &&
                  Object.keys(formik.errors).length
                    ? 'You have entered invalid data'
                    : null}
                </P>
              </>
            )}
          </View>
          <View style={styles.inputcont}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },
  pageContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  vectorimage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  inputcont: {
    width: '100%',
    alignItems: 'center',
  },
  bankName: {
    marginVertical: 20,
    textAlign: 'center',
  },
});
