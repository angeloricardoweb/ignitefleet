import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import Loading from './src/components/Loading';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes } from './src/routes';
import useAuthenticatedStore from '@stores/useAuthenticatedStore';
// import OneSignal from 'react-native-onesignal';
// OneSignal.setAppId("api-key");
// OneSignal.promptForPushNotificationsWithUserResponse()

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <StatusBar style="light" backgroundColor={'#000'} translucent />
    </QueryClientProvider>
  );
}
