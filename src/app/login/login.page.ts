import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
   }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      let message: string;

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'E-mail sendo usado.';
          break;

        case 'auth/invalid-email':
          message = 'E-mail inválido.';
          break;

        case (error.code):
          message = 'Senha muito curta!';
          break;
      }
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Só um minutin...' });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }
}
