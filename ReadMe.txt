==================== PERMULAAN ===========================
(Setelah Clone dari GitHub)
1. Arahkan node.js atau terminal ke folder aplikasinya
    -> cd C:\GeniooMobile (atau cd.. untuk kembali; atau cd /d E: utk pindah)
2. npm install
3. npm install -g react-native-cli
4. react-native start
5. react-native run-android
SELESAI

==================== PACKAGES ===========================

npm install --save react-redux
npm install --save react-navigation
npm install --save react-native-router-flux
npm install react-native-otp-verify --save
npm i react-native-screens
npm i react-native-reanimated
react-native link react-native-reanimated
react-native link react-native-gesture-handler
react-native link react-native-otp-verify
npm install --save prop-types
react-native unlink react-native-gesture-handler
npm install react-native-google-signin
npm i react-native-dropdownalert --save
----Ini yg PENTING!----
npm install midtrans-client --save
npm install --date-fns --save
npm install react-native-image-slider-box --save
npm install react-native-fast-image --save


==================== ERROR-ERROR ===========================
1.
    npm cache clean --force
    npm start -- --reset-cache
    npm react-native run-android --no-jetifier (reset)
    react-native start --reset-cache (reset)
    react-native run-android --no-jetifier (batalkan andoidX)
2.
    1. cd android
    2. ./gradlew clean
    3. cd..
    4. Ulangi PERMULAAN di atas

3. 
    1. Hapus folder node_modules
    2. Ulangi  PERMULAAN di atas

4. 
    1. pergi ke C:\GeniooMobile\node_modules\metro-config\src\defaults
    2. cari folder Blacklist.js
    3. ubah kode "var sharedBlacklist = []" 
       menjadi ini:
        ------------------------
        var sharedBlacklist = [
        /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
        /website\/node_modules\/.*/,
        /heapCapture\/bundle\.js/,
        /.\/tests\/./
        ];
        ------------------------

5. Issue: bundling failed: Error: Unable to resolve 
    module `redux` from `index.js`: redux could not be 
    found within the project.
    1. npm cache clean --force
    2. npm install --force --unsafe-perm
    3. react-native start
    4. react-native run-android
    atau
    1. npm i redux --save

6. Issue: bundling failed: Error: 
    Unable to resolve module `react-native-gesture-handler`
    1. npm install --save react-native-gesture-handler

7. Issue: Failed to install the app. Make sure you have the ]   
    Android development environment set up: 
    https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment. 
    Run CLI with --verbose flag for more details.
    1. react-native unlink react-native-gesture-handler
    2. npm uninstall react-navigation
    3. npm uninstall react-navigation-gesture-handler
    Than, follow these steps:
    4. npm install --save react-navigation
    5. npm install --save react-native-gesture-handler
    6. react-native link react-native-gesture-handler

8. error Could not install the app on the device, read the error above for details.
    Make sure you have an Android emulator running or a device connected and have
    set up your Android development environment:
    https://facebook.github.io/react-native/docs/getting-started.html
    error Command failed: gradlew.bat app:installDebug. Run CLI with --verbose flag for more details.\
    1. pergi ke C:\GeniooMobile\android\local.properties
    2. ganti bagian 'user' sesuai lokasi sdk yg udh diinstal sblmnya
       -> C\:\\Users\\user\\AppData\\Local\\Android\\Sdk
       (kalo bingung, coba buka android studio > Configure > Settings
       Android SDK Location)


==================== STRUKTUR FOLDER ===========================
/src
Disinilah tempat kita menuliskan dan menyimpan kode yang kita buat. 
Selanjutnya saya akan membahas semua struktur yang ada di dalam folder ini.

/src/actions
Di gunakan untuk menyimpan action pemanggilan reducer yang di panggil 
melalui component dalam implementasi redux.

/src/assets
Tempat menyimpan file static seperti font dan gambar.

/src/commons (disini Container)
Sekumpulan file yang memiliki fungsi atau method yang sering di gunakan di 
banyak file, seperti filter tanggal, validation handling, error handling, dan lain2.

/src/components
Berisi component reusable yang di gunakan di banyak tempat.

/src/reducers
Tempat kita menyimpan global state pada redux. Saya biasa memisahkan module 
file berdasarkan fiturnya seperti pada di gambar.

/src/screens
Component entry point yang muncul pertama kali setelah navigasi di eksekusi.

/src/styles
Di dalam folder ini tempat menyimpan file yang berkaitan dengan base styling. 
Mengenai base styling pada react native, kita akan bahas di artikel selanjutnya.

stores.js (disini Lib)
Entry point dari implementasi redux.




==================== Class dan Function ===========================

Source : https://medium.com/coderupa/react-prop-state-apa-bedanya-7ee61df8257f

Untuk sekarang ingat saja functional component tidak memiliki state, 
itu sebabnya barang ini biasa disebut stateless component.
Sedangkan class component bisa memiliki prop dan state.

class App extends React.Component {
    state = {
        activeRowKey: null
    }
    render() {
        
        return (
            <View></View>
        );
    }
}

export default connect(null, {removeItem})(CartItems);

------------------atau-------------------------
export default function App() {
  return (
    <View></View>
  );
}


================ LINK ===============
https://oblador.github.io/react-native-vector-icons/


https://www.youtube.com/watch?v=XME68dWpKyc
https://www.youtube.com/watch?v=_K41vd_W2qE




================ DEBUGING =====================
di Hape, Debugging USB > Mode Pengembang
di Emulator, Android Studio > AVD Manager

- di aplikasi yg udh running 
  -> klik Ctrl+M (emulator)
  -> klik menu/kocok aja hapenya klo respon (hape)
  > Debug JS Remotely = DEBUGING
  > Enable Live Reload = refresh otomatis


================ build apk ===================
  
1. hapus apk di folder: maturanapp\android\app\build\outputs\apk\debug

2. build apk yg baru, ketik command:
	react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

3. maka akan terbuild apk yg baru

4. hapus gradle di folder android, ketik command:
	cd android
	gradlew clean 

5. kembali ke folder root proyek & jalankan android, ketik command:
	cd ..
	react-native run-android
EMV QRCPS QR Code Specification for Payment Systems