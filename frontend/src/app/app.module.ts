import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule } from 'ngx-pagination';
import { TokenServiceService } from './@core/token-service.service';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoaderComponent } from './common-components/loader/loader.component';
import { ProductPlaceholderComponent } from './common-components/product-placeholder/product-placeholder.component';
import { CommonComponentsModule } from './common-components/common-components.module';

 

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        PageNotFoundComponent,
        LoaderComponent,
        ProductPlaceholderComponent
    ],

    bootstrap: [AppComponent],
    
    imports: [BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ComponentsModule,
        NgbModule,
        NgxPaginationModule,
        BrowserAnimationsModule,
        CommonComponentsModule
     ],

        providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenServiceService, multi: true }, provideHttpClient(withInterceptorsFromDi())] })


export class AppModule { }
