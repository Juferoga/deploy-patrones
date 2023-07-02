import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Movies } from 'src/app/core/models/movies/movies.model';
import { TicketService } from '@services/ticket/ticket.service';
import { MovieService } from '@services/movies/movie.service';

@Component({
    styleUrls: ["./purchase.component.scss"],
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Películas  </ng-template>
                <ng-template pTemplate="subtitle"> Elige la película que deseas ver </ng-template>
                <ng-template pTemplate="content"> <!-- Aca va la vista -->
                    <div id="contenedor-cards">
                        <p-card *ngFor="let item of movieList" [header]="item.t_title" [subheader]="item.t_overview" [style]="{ width: '260px' }">
                            <ng-template pTemplate="header">
                                <img alt="Card" src="https://primefaces.org/cdn/primeng/images/usercard.png" />
                            </ng-template>
                            <p>{{item.t_actors}}</p>
                            <p>{{item.b_adult?'+18':'E'}}</p>
                            
                            <p-rating [(ngModel)]="item.n_rating" [readonly]="true" [cancel]="false"></p-rating>
                            
                            <ng-template pTemplate="footer">
                                <p-button label="Elegir entradas" icon="pi pi-check"></p-button>
                            </ng-template>
                        </p-card>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="grid grid-nogutter justify-content-between">
                        <p-button label="Siguiente" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
        `
})
export class MoviesDemo implements OnInit {
    constructor(
        public ticketService: TicketService, 
        private router: Router,
        private messageService: MessageService,
        private movieService: MovieService
    ) {}

    movies: any;
    movieList : Movies[];

    ngOnInit() {
        this.movies = this.ticketService.ticketInformation.products;
        this.movieService.getMovies().subscribe(
            (movies: Movies[])=>{
                this.movieList = movies;
                console.log(movies);
                this.messageService.add({
                    key: "grl-toast",
                    severity: "success",
                    summary: `COMPLETADO`,
                    detail: "::: COMPLETO ::: \n",
                });
            },
            (error)=>{
                this.messageService.add({
                    key: "grl-toast",
                    severity: "error",
                    summary: `ERROR`,
                    detail: "::: ERROR ::: \n" + error["error"]["detail"],
                });
            }
        )
    }
    
    nextPage() {
        this.ticketService.ticketInformation.products = this.movies;
        this.router.navigate(['admin/mis-compras/shows']);
    }
}