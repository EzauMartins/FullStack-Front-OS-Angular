import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

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
    private router: Router

  ) { }

  ngOnInit(): void {
    this.listCliente();
    this.listTecnico();

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
  create():void{
    this.service.create(this.os).subscribe(resposta => {
      this.service.message("Ordem criada com sucesso !");
      this.router.navigate(['os'])
    })   
  }

  cancel():void{
    this.router.navigate(['os'])

  }

  }

 
