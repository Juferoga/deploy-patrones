import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
})
export class StockComponent {

  //Inventario
  productDialog: boolean;
  products: any[];
  product: any;
  selectedProducts: any[];
  submitted: boolean;
  statuses: any[];
  Delete: string;
  categoriesList: any[]=[];
  bodegasList: any[];
  bodega : any;
  isUpdated:boolean=false;
  //Productos
  productosDialog: boolean;
  productos: any[];
  producto: any;
  productoSeleccionado: any[];
  //select INV
  countryString:string='';
  regionString:string='';
  warehouseString:string='';


  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {

    this.statuses = [
      { label: "Inactivo", value: "I" },
      { label: "Activo", value: "A" },
    ];
  }

  openNew() {
    this.producto = {
      id:0,
      producto : '',
      nombre : '',
      descripcion : '',
      precio : 0,
      estado : true,
      categoria : ''
    };
    this.submitted = false;
    this.productosDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: "Estas seguro de eliminar los productos?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Productos eliminados",
          life: 3000,
        });
      },
    });
  }

  deleteProductInv(product: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + product.nombre + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        // this.productService.deleteProduct(product.id).subscribe({
        //   next:(response)=>{
        //     this.messageService.add({
        //       key: "grl-toast",
        //       severity: "success",
        //       summary: `Eliminación exitosa`,
        //       detail: `La eliminación del producto ${this.producto['nombre'].toUpperCase()},
        //       se realizo correctamente sobre la base de datos`,
        //     });
        //   },
        //   error:(err)=>{
        //     this.messageService.add({
        //       key: "grl-toast",
        //       severity: "error",
        //       summary: `Eliminación del producto ${this.product['nombre'].toUpperCase()} realizada SIN ÉXITO`,
        //       detail: "::: ERROR ::: \n" + err["error"]["detail"],
        //     });
        //   }
        // })
        this.products = this.products.filter(
          (val) => val.producto !== product.producto
        );
        this.product = {
          producto : '',
          nombre : '',
          descripcion : '',
          precio : 0,
          estado : true,
          categoria : ''
        };
      },
    });
  }

  editProducto(product: any) {
    this.producto = { ...product };
    this.isUpdated = true;
    this.productosDialog = true;
  }

  deleteProducto(product: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + product.nombre + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        // this.productService.deleteProduct(Number(product.producto)).subscribe({
        //   next:(response)=>{
        //     this.messageService.add({
        //       key: "grl-toast",
        //       severity: "success",
        //       summary: `Eliminación exitosa`,
        //       detail: `La eliminación del producto ${this.producto['nombre'].toUpperCase()},
        //       se realizo correctamente sobre la base de datos`,
        //     });
        //   },
        //   error:(err)=>{
        //     this.messageService.add({
        //       key: "grl-toast",
        //       severity: "error",
        //       summary: `Eliminación del producto ${this.product['nombre'].toUpperCase()} realizada SIN ÉXITO`,
        //       detail: "::: ERROR ::: \n" + err["error"]["detail"],
        //     });
        //   }
        // })
        this.products = this.products.filter(
          (val) => val.producto !== product.producto
        );
        this.product = {
          producto : '',
          nombre : '',
          descripcion : '',
          precio : 0,
          estado : true,
          categoria : ''
        };
      },
    });
  }

  hideDialog() {
    this.productosDialog = false;
    this.submitted = false;
  }

  createProduct() {
    this.submitted = true;
    this.producto.precio = Number(this.producto.precio)
    // this.productService.createProduct(this.producto).subscribe({
    //   next:()=>{
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "success",
    //       summary: `${this.isUpdated ? 'Actualización':'Creación'}  exitosa`,
    //       detail: `La ${this.isUpdated ? 'actualización':'creación'} del producto ${this.producto['nombre'].toUpperCase()},
    //       se realizo correctamente sobre la base de datos`,
    //     });
    //   },
    //   error:(err)=>{
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "error",
    //       summary: `Consulta del producto ${this.producto['nombre'].toUpperCase()} realizada SIN ÉXITO`,
    //       detail: "::: ERROR ::: \n" + err["error"]["detail"],
    //     });
    //   }
    // })
    this.productos = [...this.productos];
    this.isUpdated = false;
    this.productosDialog = false;
    this.producto = {
      producto : '',
      nombre : '',
      descripcion : '',
      precio : 0,
      estado : true,
      categoria : ''
    };
  }

  saveProduct() {
    this.submitted = true;
    this.producto.precio = Number(this.producto.precio)
    // this.productService.createProduct(this.producto).subscribe({
    //   next:()=>{
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "success",
    //       summary: `${this.isUpdated ? 'Actualización':'Creación'}  exitosa`,
    //       detail: `La ${this.isUpdated ? 'actualización':'creación'} del producto ${this.producto['nombre'].toUpperCase()},
    //       se realizo correctamente sobre la base de datos`,
    //     });
    //   },
    //   error:(err)=>{
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "error",
    //       summary: `Consulta del producto ${this.producto['nombre'].toUpperCase()} realizada SIN ÉXITO`,
    //       detail: "::: ERROR ::: \n" + err["error"]["detail"],
    //     });
    //   }
    // })
    this.productos = [...this.productos];
    this.isUpdated = false;
    this.productosDialog = false;
    this.producto = {
      producto : '',
      nombre : '',
      descripcion : '',
      precio : 0,
      estado : true,
      categoria : ''
    };
  }

  openNewInv() {
    this.product = {
      id:0,
      producto : '',
      nombre : '',
      descripcion : '',
      precio : 0,
      estado : true,
      categoria : ''
    };
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.isUpdated = true;
    this.productDialog = true;
  }

  hideDialogInv() {
    this.productDialog = false;
    this.submitted = false;
  }

  /* Crear nueva bodega */
  createProductInv(){
    let data = {
      id_warehouse: Number(this.product.bodega),
      id_product: Number(this.product.id),
      cantidad: Number(this.product.cantidad)
    }
    // this.bodegaService.createBodega(data).subscribe({
    //   next:()=>{
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "success",
    //       summary: "Actualización exitosa",
    //       detail: `La actualización del producto ${this.product['nombre'].toUpperCase()},
    //       se realizo correctamente sobre la base de datos`,
    //     });
    //   },
    //   error:(err)=>{
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "error",
    //       summary: `Consulta del producto ${this.product['nombre'].toUpperCase()} realizada SIN ÉXITO`,
    //       detail: "::: ERROR ::: \n" + err["error"]["detail"],
    //     });
    //   }
    // })
    this.products = [...this.products];
    this.productDialog = false;
    this.product = {
      producto : '',
      nombre : '',
      descripcion : '',
      precio : 0,
      estado : true,
      categoria : ''
    };
  }

  /* Actualizar una bodega */
  saveProductInv(){
    this.submitted = true;
    let data = {
      id_warehouse: Number(this.product.bodega),
      id_product: Number(this.product.id),
      cantidad: Number(this.product.cantidad)
    }
    // this.bodegaService.editProductBodega(data).subscribe({
    //   next:()=>{
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "success",
    //       summary: `${this.isUpdated ? 'Actualización':'Creación'}  exitosa`,
    //       detail: `La ${this.isUpdated ? 'actualización':'creación'} del producto 
    //       ${this.products.find(el=> el.id == data.id_any)['nombre'].toUpperCase()},
    //       se realizo correctamente sobre la base de datos`,
    //     });
    //   },
    //   error:(err)=>{
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "error",
    //       summary: `Consulta del producto ${this.products.find(el=> el.id == data.id_any)['nombre'].toUpperCase()} realizada SIN ÉXITO`,
    //       detail: "::: ERROR ::: \n" + err["error"]["detail"],
    //     });
    //   }
    // })
    this.products = [...this.products];
    this.isUpdated = false;
    this.productDialog = false;
    this.product = {
      producto : '',
      nombre : '',
      descripcion : '',
      precio : 0,
      estado : true,
      categoria : ''
    };
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].producto === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  checkWarehouse(event){
    // this.bodegaService.getBodega(event.target.value).subscribe({
    //   next: (response) => {
    //     this.products = response["data"];
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "success",
    //       summary: "Consulta exitosa",
    //       detail: `La consulta de la BODEGA ${event.target.value} se realizo correctamente sobre la base de datos`,
    //     });
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "error",
    //       summary: `Consulta de la BODEGA ${event.target.value} realizada SIN ÉXITO`,
    //       detail: "::: ERROR ::: \n" + err["error"]["detail"],
    //     });
    //   }
    // });
  }

  createId(): string {
    let id = "";
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  checkBodega(){
    let url = ''
    // Construir la parte de la URL correspondiente a las variables existentes
    let urlParams = '';
    if (this.countryString) {
      urlParams += 'c';
      url += `?country=${this.countryString}`;
    }
    if (this.regionString) {
      urlParams += 'r';
      url += `${urlParams === '' ? '?' : '&'}region=${this.regionString}`;
    }
    if (this.warehouseString) {
      urlParams += 'h';
      url += `${urlParams === '' ? '?' : '&'}warehouse=${this.warehouseString}`;
    }

    // Añadir la parte de la URL correspondiente a las variables existentes
    url = `${urlParams}/${url}`;
        
    // this.bodegaService.getBodegaInventory(url).subscribe({
    //   next: (response) => {
    //     this.products = response["data"];
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "success",
    //       summary: "Consulta exitosa",
    //       detail: `La consulta de la BODEGA ${url} se realizo correctamente sobre la base de datos`,
    //     });
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       key: "grl-toast",
    //       severity: "error",
    //       summary: `Consulta de la BODEGA ${url} realizada SIN ÉXITO`,
    //       detail: "::: ERROR ::: \n" + err["error"]["detail"],
    //     });
    //   }
    // });
  }
}
