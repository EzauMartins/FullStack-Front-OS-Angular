import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent implements OnInit {

  os: OS = {
    prioridade: '',
    observacoes: '',
    status: '',
    tecnico: '',
    cliente: ''
  }

  clientes: Cliente[] = [];

  tecnicos: Tecnico[] = [];

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private service: OsService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.findByid();
    this.listCliente();
    this.listTecnico();
    

  }

  findByid():void{
    this.service.findById(this.os.id).subscribe(resposta =>{
      this.os = resposta;

      console.log(this.os)
      this.convertDados();

      
    })
  }


  listCliente():void{
    this.clienteService.findALL().forEach(x =>{
      this.clientes = x;
    })
  }

  listTecnico():void{
    this.tecnicoService.findALL().forEach(x =>{
      this.tecnicos = x;
  })

  }
  update():void{
    
    this.service.update(this.os).subscribe(resposta => {
      this.service.message("Ordem criada com sucesso !");
      this.router.navigate(['os'])
      console.log(this.os)
    }) 
  }

  cancel():void{
    this.router.navigate(['os'])

  }

  convertDados():void{

   
    if(this.os.status == "ABERTO"){

      console.log('ok')
      this.os.status = 0;
    } else   if(this.os.status == "ANDAMENTO"){
      this.os.status = 1;
    } else {
      this.os.status = 2;
    }

    if(this.os.prioridade == "BAIXA"){
      this.os.prioridade = 0;
    } else   if(this.os.prioridade == "MEDIA"){
      this.os.prioridade = 1;
    } else   {
      this.os.prioridade = 2;
    } 

  }

  }

 
