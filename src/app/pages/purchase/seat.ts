import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '@services/ticket/ticket.service';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Asientos  </ng-template>
                <ng-template pTemplate="subtitle"> Elige los asientos </ng-template>
                <ng-template pTemplate="content"> <!-- Aca va la vista -->
                <p-table [value]="productList" dataKey="code" [tableStyle]="{'min-width': '50rem'}">
                    <ng-template pTemplate="header">
                        <tr>
                            <th style="width: 4rem">
                                No.
                            </th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Categoría</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product let-a>
                        <tr>
                            <td><pre>{{a.id}}</pre></td>
                            <td>{{product.nombre}}</td>
                            <td>{{product.descripcion}}</td>
                            <td>{{product.precio}}</td>
                            <td>{{product.cantidad}}</td>
                            <td style="display: flex; justify-content: space-evenly;">
                                <p-button (click)="agregarCarrito(a.id,product)" icon="pi pi-plus" styleClass="p-button-rounded"></p-button>
                                <p-button (click)="eliminarCarrito(a.id)" icon="pi pi-minus" styleClass="p-button-rounded"></p-button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="grid grid-nogutter justify-content-between">
                        <p-button label="Volver" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
                        <p-button label="Siguiente" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
        `
})
export class SeatDemo implements OnInit {
    constructor(
        public ticketService: TicketService, 
        private router: Router,
        private messageService: MessageService,
    ) {}

    products: any;
    productList : any[];
    productListCarrito : any[];

    ngOnInit() {
        this.products = this.ticketService.ticketInformation.products;
				let url = ''
				// Construir la parte de la URL correspondiente a las variables existentes
				let urlParams = '';
				let warehouse = 3
				if (this.ticketService.ticketInformation.personalInformation.pais) {
					urlParams += 'c';
					url += `?country=${this.ticketService.ticketInformation.personalInformation.pais}`;
				}
				if (this.ticketService.ticketInformation.personalInformation.region) {
					urlParams += 'r';
					url += `${urlParams === '' ? '?' : '&'}region=${this.ticketService.ticketInformation.personalInformation.region}`;
				}
				if (warehouse) {
					urlParams += 'h';
					url += `${urlParams === '' ? '?' : '&'}warehouse=${warehouse}`;
				}

				// Añadir la parte de la URL correspondiente a las variables existentes
				url = `${urlParams}/${url}`;  
				
    }
    
    nextPage() {
        this.ticketService.ticketInformation.products = this.products;
        this.router.navigate(['admin/mis-compras/snacks']);
    }

    prevPage() {
        this.router.navigate(['admin/mis-compras/shows']);
    }

    agregarCarrito(id,product){
			let data = {
				id_producto: id,
				id_pedido: 3265,
				cantidad: product.cantidad,
				precio_unitario: product.precio
			}
        
    }

    eliminarCarrito(id){

    }
}