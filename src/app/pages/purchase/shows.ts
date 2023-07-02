import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TicketService } from '@services/ticket/ticket.service';

@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Funciones  </ng-template>
                <ng-template pTemplate="subtitle"> Elige el horario en que desees ver la película </ng-template>
                <ng-template pTemplate="content"> <!-- Aca va la vista -->
                    <p>{{"Aquí irán los shows o funciones..."}}</p>
                </ng-template>
                <!-- <ng-template pTemplate="footer">
                    <div class="grid grid-nogutter justify-content-between">
                        <p-button label="Volver" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
                        <p-button label="Siguiente" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                </ng-template> -->
            </p-card>
        </div>
        `
})
export class ShowsDemo implements OnInit {
    constructor(
        public ticketService: TicketService, 
        private router: Router,
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
				// this.bodegaService.getBodegaInventory(url).subscribe({
				// 	next: (response) => {
				// 		this.productList = response["data"];
				// 		this.messageService.add({
				// 			key: "grl-toast",
				// 			severity: "success",
				// 			summary: "Consulta exitosa",
				// 			detail: `La consulta de la BODEGA ${url} se realizo correctamente sobre la base de datos`,
				// 		});
				// 	},
				// 	error: (err) => {
				// 		this.messageService.add({
				// 			key: "grl-toast",
				// 			severity: "error",
				// 			summary: `Consulta de la BODEGA ${url} realizada SIN ÉXITO`,
				// 			detail: "::: ERROR ::: \n" + err["error"]["detail"],
				// 		});
				// 	}
				// });
    }
    
    prevPage() {
        this.router.navigate(['admin/mis-compras/movies']);
    }
    
    nextPage() {
        this.ticketService.ticketInformation.products = this.products;
        this.router.navigate(['admin/mis-compras/seat']);
    }
    
    agregarCarrito(id,product){
			let data = {
				id_producto: id,
				id_pedido: 3265,
				cantidad: product.cantidad,
				precio_unitario: product.precio
			}
        // this.orderService.addItemOrder(data).subscribe(
        //     (data)=> {
        //         this.productListCarrito = data['data'];
        //     },
        //     (err)=>{
        //         this.messageService.add({
        //             key: "grl-toast",
        //             severity: "error",
        //             summary: "ERROR",
        //             detail: "La consulta se realizo con errores"+err,
        //         });
        //     }
        // )
    }

    eliminarCarrito(id){

    }
}