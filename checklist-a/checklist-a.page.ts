import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';
import {  FormGroup, FormBuilder, Validators, FormArray  } from "@angular/forms";



@Component({
  selector: 'app-checklist-a',
  templateUrl: './checklist-a.page.html',
  styleUrls: ['./checklist-a.page.scss'],


})
export class ChecklistAPage implements OnInit {

 /*  todo = {}
  logForm() {
    console.log(this.todo)
  } */

  ionicForm: any = "";
  radioValue: string = "";
  selecionar: string = "";
  id: any = "";
  nome: string = "";
  tipo: any = "";
  epoca: string = "";
  nomeUsuario : any = "";
  idUsuario : any = "";
  resp: any = "";
  itens : any = [];
  limit : number = 1000;
  start : number = 0;
  questao: any = "";
  

  defaultSelectedRadio = "radio_2";
  selectedRadioGroup:any;
  selectedRadioItem:any;
  idquestao: string = "";

 

  constructor(
    private provider:DataService,
    private router:Router, 
    private actRouter:ActivatedRoute,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
   
    
  ) { 

  
  }

 



  ngOnInit() {

    this.nomeUsuario = localStorage.getItem("nomeUsuario");
    this.idUsuario = localStorage.getItem("idUsuario");
    //console.log(this.itens);

    this.actRouter.params.subscribe((data:any)=>{
      this.id = data.id;
      this.tipo = data.tipo;
      this.epoca = data.epoca;
      
     
    });


 
    
  }


  radio_list = [
    {
      
      id: '1',
      name: 'radio_list',
      value: 'Ok',
      text: 'Ok',
      disabled: false,
      color: 'primary'
    }, {
      id: '2',
      name: 'radio_list',
      value: 'Regular',
      text: 'Regular',
      disabled: false,
      checked: true,
      color: 'secondary'
    }, {
      id: '3',
      name: 'radio_list',
      value: 'Corrigir',
      text: 'Corrigir',
      disabled: false,
      checked: false,
      color: 'danger'
    },
  ];

  showValue(){
    console.log(this.radioValue);
  }

  radioGroupChange(event: any ) {
    console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;
  }


  radioFocus() {
    console.log("radioFocus");
  }

  radioSelect(event: any) {
    console.log("radioSelect",event.detail);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }


 

  ionViewWillEnter(){
    this.itens = [];
    this.start = 0;
    this.carregar();
  }

  
  async mensagem(mensagem: any, cor: string){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor
    });
    toast.present();
  }

  
  carregar(){
    return new Promise(resolve => {
      this.itens = [];
      let dados = {
        idUsuario: this.idUsuario,
        limit : this.limit,
        nome: this.nome,
        start : this.start,
        tipo : this.tipo,
        epoca : this.epoca
        
        }

        this.provider.inserirApi(dados, 'os/listar-questões.php').subscribe((data: { [x: string]: any; }) => {

        if(data['itens'] == '0') {
          this.ionViewWillEnter();
        }else{
          this.itens = [];
          for(let item of data['itens']){
            this.itens.push(item);
            //this.itens.push(item.idquestao);
             
          }
        }
          
         resolve(true);
         
        });
    });
    
  }



  Voltar(){
    this.router.navigate(['painel-gama']);
  }

/*   register(form: any) {
    this.provider.inserirApi(form.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  } */

  executar(idquestao: any){
    return new Promise(resolve => {
      let dados = {
       
        id: this.id,
        
        idquestao,
        
       // idquestao: this.idquestao,
       
        resp: this.resp,
        questao: this.questao,
        radioValue: this.radioValue,
       
      }
      this.provider.inserirApi(dados, 'os/m-escolha.php').subscribe((data: { [x: string]: any; })=>{
          
          if(data['ok'] == true){
            this.router.navigate(['checklist-b']);
            this.mensagem(data['mensagem'], 'success');
            this.limparCampos();
          }else{
            this.mensagem(data['mensagem'], 'danger');
          }
                
          
        }
      )
    });
  }

limparCampos(){
    this.questao = "";
    this.resp = "";
  }


}
