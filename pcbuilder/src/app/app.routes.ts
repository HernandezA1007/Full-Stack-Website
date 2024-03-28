import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
// import { HeaderComponent } from './components/header/header.component';
// import { FooterComponent } from './components/footer/footer.component';
import { PcBuilderComponent } from './components/pc-builder/pc-builder.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ShopServicesComponent } from './components/shop-services/shop-services.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'header', component: HeaderComponent },
    // { path: 'footer', component: FooterComponent },
    { path: 'pc-builder', component: PcBuilderComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'shop-services', component: ShopServicesComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', component: PagenotfoundComponent }
    // .. future routes

];