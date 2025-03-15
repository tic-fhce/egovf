"use strict";(self["webpackChunkegovf"]=self["webpackChunkegovf"]||[]).push([[626],{7950:function(e,a,o){o.d(a,{A:function(){return i}});var s=o(4373),l=o(1660);const t=l.j6;class i{headersUsuario(e){s.A.defaults.headers.common["Authorization"]="Bearer "+e}getEgovf(e){return s.A.get(t+"ciudadano/getEgovf",{params:{cif:e}})}getListaCiudadano(){return s.A.get(t+"ciudadano/getListaCiudadano")}getListaEmpleado(){return s.A.get(t+"ciudadano/getListaEmpleado")}}},6025:function(e,a,o){o.d(a,{A:function(){return r}});var s=o(4373),l=o(1660);const t=l.ru,i=l.j6;class r{getToken(e){var a={id:e.id,cif:e.cif,matricula:e.matricula,ci:e.ci,complemento:e.complemento,correo:e.correo,celular:e.celular,pass:e.pass};return s.A.post(t+"login",a)}headersUsuario(e){s.A.defaults.headers.common["Authorization"]="Bearer "+e}getPerfil(e){return s.A.get(t+"getPerfil",{params:{cif:e}})}getUsuario(e){return s.A.get(t+"getUsuario",{params:{cif:e}})}updatePersona(e){const a={id:e.idPersona,cif:e.cif,ci:e.ci_com,complemento:e.complemento,nombre:e.nombre,paterno:e.paterno,materno:e.materno,fecha:e.fecha,sexo:e.sexo,cel:e.celular,correo:e.correo};return s.A.put(i+"persona/updatePersona",a)}updateUsuario(e){const a={id:e.idUsuario,cif:e.cif,matricula:e.matricula,ci:e.ci_com,complemento:e.complemento,correo:e.correo,celular:e.celular,pass:e.pass,unidad:e.unidad,dependiente:e.dependiente,sigla:e.sigla,foto:e.foto,empleado:e.empleado};return s.A.put(i+"usuario/updateUsuario",a)}updatePass(e){return s.A.put(i+"usuario/updatePass",e)}updatePassAdmin(e){return s.A.put(i+"usuario/updatePassAdmin",e)}updateUnidad(e,a){const o={id:e.idUsuario,cif:e.cif,matricula:e.matricula,ci:e.ci_com,complemento:e.complemento,correo:e.correo,celular:e.celular,pass:e.pass,unidad:a.unidad,dependiente:a.dependiente,sigla:a.sigla,foto:e.foto,empleado:e.idPersona};return s.A.put(i+"usuario/updateUsuario",o)}}},7160:function(e,a,o){o.d(a,{A:function(){return i}});var s=o(4373),l=o(1660);const t=l.H4;class i{getListarCifCero(){return s.A.get("biometrico/listarCifCero")}addImagen(e){return s.A.post(t+"upload.php",e)}getUrl(){return t+"imagenes/"}getImage(e){return s.A.get(e,{headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"*"}})}}},5259:function(e,a,o){o.d(a,{A:function(){return v}});var s=o(6768),l=o(4232);const t={class:"mb-3 row"},i={class:"card-title"},r={class:"mb-3 row"},c=(0,s.Lk)("label",{for:"nombre",class:"col-4"},"Nombre : ",-1),n={for:"nombre",class:"col-8"},u={class:"mb-3 row"},d=(0,s.Lk)("label",{for:"apellido",class:"col-4"},"Apellidos : ",-1),f={for:"nombre",class:"col-8"};function m(e,a,o,m,k,p){return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.Lk)("div",t,[(0,s.Lk)("h4",i,"CIF : "+(0,l.v_)(o.datos.cif),1)]),(0,s.Lk)("div",r,[c,(0,s.Lk)("label",n,(0,l.v_)(o.datos.nombre),1)]),(0,s.Lk)("div",u,[d,(0,s.Lk)("label",f,(0,l.v_)(o.datos.apellido),1)])],64)}var k={name:"ComponenteNombres",props:["datos"]},p=o(1241);const b=(0,p.A)(k,[["render",m]]);var v=b},2626:function(e,a,o){o.r(a),o.d(a,{default:function(){return ge}});var s=o(6768),l=o(4232),t=o(5130);const i=["src"],r={class:"d-grid gap-2"},c=(0,s.Lk)("br",null,null,-1),n={class:"card-title"},u=(0,s.Lk)("br",null,null,-1),d=(0,s.Lk)("hr",null,null,-1),f={class:"lista"},m={class:"lista"},k={class:"lista"},p={class:"lista"},b={key:0,class:"lista"},v={key:1,class:"lista"},g=(0,s.Lk)("br",null,null,-1),h=(0,s.Lk)("label",{class:"d-none d-md-flex me-auto"},"Datos",-1),C=(0,s.Lk)("label",{class:"d-none d-md-flex me-auto"},"Actualizar",-1),F=(0,s.Lk)("br",null,null,-1),L={class:"lista"},_={class:"lista"},A={class:"lista"},w={class:"lista"},P={class:"lista"},$={class:"lista"},U={class:"lista"},y=(0,s.Lk)("br",null,null,-1),D={class:"lista"},M={class:"lista"},x={class:"lista"},z={class:"lista"},S={class:"lista"},I={class:"lista"},N={class:"lista"},W={class:"lista"},B=(0,s.Lk)("h5",null,"Actualizar Numero de Celular",-1),E={class:"mb-3 row"},T=(0,s.Lk)("label",{for:"celular",class:"col-6 col-form-label"},"Nuevo Numero de Celular : ",-1),V={class:"col-6"},X=(0,s.Lk)("h5",null,"Actualizar Contraseña",-1),K={class:"mb-3 row"},G=(0,s.Lk)("label",{for:"actual",class:"col-sm-6 col-form-label"},"Contraseña Actual :",-1),H={class:"col-sm-6"},J={class:"mb-3 row"},j=(0,s.Lk)("label",{for:"nueva",class:"col-sm-6 col-form-label"},"Nueva Contraseña :",-1),q={class:"col-sm-6"},Q={class:"mb-3 row"},R=(0,s.Lk)("label",{for:"confirmar",class:"col-sm-6 col-form-label"},"Confirmar Nueva Contraseña :",-1),O={class:"col-sm-6"},Y={class:"mb-3 row text-center"},Z={key:0,class:"col-sm-12 col-form-label"},ee=(0,s.Lk)("div",{class:"alert alert-danger",role:"alert"}," Las Contraseñas no Coinciden ",-1),ae=[ee],oe=(0,s.Lk)("h5",null,"Actualizar Foto de Perfil",-1),se={class:"mb-3 row"},le=(0,s.Lk)("label",{for:"archivo",class:"col-4 col-form-label"},"Foto de Perfil",-1),te={class:"col-8"},ie=(0,s.Lk)("br",null,null,-1),re={class:"md-3 row text-center"},ce=["src"],ne={class:"btn btn-success font"};function ue(e,a,o,ee,ue,de){const fe=(0,s.g2)("CCardHeader"),me=(0,s.g2)("CIcon"),ke=(0,s.g2)("CButton"),pe=(0,s.g2)("CCol"),be=(0,s.g2)("CFormLabel"),ve=(0,s.g2)("CRow"),ge=(0,s.g2)("CCardBody"),he=(0,s.g2)("CCard"),Ce=(0,s.g2)("CNavLink"),Fe=(0,s.g2)("CNavItem"),Le=(0,s.g2)("CNav"),_e=(0,s.g2)("CTabPane"),Ae=(0,s.g2)("CTabContent"),we=(0,s.g2)("CModalTitle"),Pe=(0,s.g2)("CModalHeader"),$e=(0,s.g2)("ComponenteNombres"),Ue=(0,s.g2)("CModalBody"),ye=(0,s.g2)("CModalFooter"),De=(0,s.g2)("CModal");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.bF)(ve,null,{default:(0,s.k6)((()=>[(0,s.bF)(pe,{lg:6},{default:(0,s.k6)((()=>[(0,s.bF)(he,null,{default:(0,s.k6)((()=>[(0,s.bF)(fe,{class:"headercolor"},{default:(0,s.k6)((()=>[(0,s.eW)(" Datos Personales ")])),_:1}),(0,s.bF)(ge,null,{default:(0,s.k6)((()=>[(0,s.bF)(ve,null,{default:(0,s.k6)((()=>[(0,s.bF)(pe,{lg:4},{default:(0,s.k6)((()=>[(0,s.Lk)("img",{src:ue.egovf.foto,class:"img-fluid rounded-start",alt:"..."},null,8,i),(0,s.Lk)("div",r,[(0,s.bF)(ke,{color:"dark",onClick:a[0]||(a[0]=e=>de.clickModalFoto(!0))},{default:(0,s.k6)((()=>[(0,s.bF)(me,{icon:"cil-camera"}),(0,s.eW)(" Actualizar")])),_:1})])])),_:1}),(0,s.bF)(pe,{lg:8},{default:(0,s.k6)((()=>[c,(0,s.Lk)("h4",n,"CIF : "+(0,l.v_)(ue.egovf.cif),1),(0,s.bF)(be,{for:"nombre",class:"col-md-4"},{default:(0,s.k6)((()=>[(0,s.eW)("Nombre : ")])),_:1}),(0,s.bF)(be,{for:"nombre",class:"col-md-8"},{default:(0,s.k6)((()=>[(0,s.eW)((0,l.v_)(ue.egovf.nombre),1)])),_:1}),u,(0,s.bF)(be,{for:"apellido",class:"col-md-4"},{default:(0,s.k6)((()=>[(0,s.eW)("Apellidos : ")])),_:1}),(0,s.bF)(be,{for:"apellido",class:"col-md-8"},{default:(0,s.k6)((()=>[(0,s.eW)((0,l.v_)(ue.egovf.paterno)+" "+(0,l.v_)(ue.egovf.materno),1)])),_:1}),d,(0,s.Lk)("ul",null,[(0,s.Lk)("li",f,"C.I. : "+(0,l.v_)(ue.egovf.ci),1),(0,s.Lk)("li",m,"Correo : "+(0,l.v_)(ue.egovf.correo),1),(0,s.Lk)("li",k,"Celular : "+(0,l.v_)(ue.egovf.celular),1),(0,s.Lk)("li",p,"Fecha N : "+(0,l.v_)(ue.egovf.fecha),1),1==ue.egovf.sexo?((0,s.uX)(),(0,s.CE)("li",b,"Sexo : Femenino")):((0,s.uX)(),(0,s.CE)("li",v,"Sexo : Masculino"))])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,s.bF)(pe,{lg:6},{default:(0,s.k6)((()=>[g,(0,s.bF)(he,null,{default:(0,s.k6)((()=>[(0,s.bF)(fe,{class:"headercolor"},{default:(0,s.k6)((()=>[(0,s.eW)(" Datos E-govf ")])),_:1}),(0,s.bF)(ge,null,{default:(0,s.k6)((()=>[(0,s.bF)(Le,{variant:"tabs",class:"nav nav-tabs"},{default:(0,s.k6)((()=>[(0,s.bF)(Fe,null,{default:(0,s.k6)((()=>[(0,s.bF)(Ce,{active:1==ue.tab,onClick:a[1]||(a[1]=e=>de.clicktab(1))},{default:(0,s.k6)((()=>[(0,s.bF)(ke,{size:"sm"},{default:(0,s.k6)((()=>[(0,s.bF)(me,{icon:"cil-user"}),h])),_:1})])),_:1},8,["active"])])),_:1}),(0,s.bF)(Fe,null,{default:(0,s.k6)((()=>[(0,s.bF)(Ce,{active:2==ue.tab,onClick:a[2]||(a[2]=e=>de.clicktab(2))},{default:(0,s.k6)((()=>[(0,s.bF)(ke,{size:"sm"},{default:(0,s.k6)((()=>[(0,s.bF)(me,{icon:"cil-pencil"}),C])),_:1})])),_:1},8,["active"])])),_:1})])),_:1}),(0,s.bF)(Ae,null,{default:(0,s.k6)((()=>[(0,s.bF)(_e,{visible:1==ue.tab},{default:(0,s.k6)((()=>[F,(0,s.Lk)("ul",null,[(0,s.Lk)("li",L,"ID app : "+(0,l.v_)(ue.egovf.idUsuario),1),(0,s.Lk)("li",_,"CIF : "+(0,l.v_)(ue.egovf.cif),1),(0,s.Lk)("li",A,"Matricula : "+(0,l.v_)(ue.egovf.matricula),1),(0,s.Lk)("li",w,"C.I. : "+(0,l.v_)(ue.egovf.ci)+" "+(0,l.v_)(ue.egovf.complemento),1),(0,s.Lk)("li",P,"Correo : "+(0,l.v_)(ue.egovf.correo),1),(0,s.Lk)("li",$,"Celular : "+(0,l.v_)(ue.egovf.celular),1),(0,s.Lk)("li",U,"Unidad : "+(0,l.v_)(ue.egovf.sigla),1)])])),_:1},8,["visible"]),(0,s.bF)(_e,{visible:2==ue.tab},{default:(0,s.k6)((()=>[y,(0,s.Lk)("ul",null,[(0,s.Lk)("li",D,"ID app : "+(0,l.v_)(ue.egovf.idUsuario),1),(0,s.Lk)("li",M,"CIF : "+(0,l.v_)(ue.egovf.cif),1),(0,s.Lk)("li",x,"Matricula :"+(0,l.v_)(ue.egovf.matricula),1),(0,s.Lk)("li",z,"C.I. : "+(0,l.v_)(ue.egovf.ci),1),(0,s.Lk)("li",S,"Unidad : "+(0,l.v_)(ue.egovf.sigla),1),(0,s.Lk)("li",I,[(0,s.bF)(ke,{color:"success",class:"font",size:"sm",onClick:a[3]||(a[3]=e=>de.clickModalCelular(!0))},{default:(0,s.k6)((()=>[(0,s.eW)("Actualizar "+(0,l.v_)(ue.egovf.celular),1)])),_:1})]),(0,s.Lk)("li",N,"Correo : "+(0,l.v_)(ue.egovf.correo),1),(0,s.Lk)("li",W,[(0,s.bF)(ke,{color:"success",class:"font",size:"sm",onClick:a[4]||(a[4]=e=>de.clickModalPass(!0))},{default:(0,s.k6)((()=>[(0,s.eW)(" Actualizar Contraseña")])),_:1})])])])),_:1},8,["visible"])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,s.bF)(De,{visible:ue.modalCelular,onClose:a[9]||(a[9]=e=>de.clickModalCelular(!1))},{default:(0,s.k6)((()=>[(0,s.bF)(Pe,{class:"headercolor",dismiss:"",onClose:a[5]||(a[5]=e=>de.clickModalCelular(!1))},{default:(0,s.k6)((()=>[(0,s.bF)(we,null,{default:(0,s.k6)((()=>[B])),_:1})])),_:1}),(0,s.bF)(Ue,null,{default:(0,s.k6)((()=>[(0,s.bF)($e,{datos:ue.datos},null,8,["datos"]),(0,s.Lk)("div",E,[T,(0,s.Lk)("div",V,[(0,s.bo)((0,s.Lk)("input",{type:"text",class:"form-control","onUpdate:modelValue":a[6]||(a[6]=e=>ue.egovf.celular=e)},null,512),[[t.Jo,ue.egovf.celular]])])])])),_:1}),(0,s.bF)(ye,null,{default:(0,s.k6)((()=>[(0,s.bF)(ke,{onClick:a[7]||(a[7]=e=>de.clickModalCelular(!1)),color:"danger",class:"font"},{default:(0,s.k6)((()=>[(0,s.bF)(me,{icon:"cil-x",class:"me-2"}),(0,s.eW)("Cancelar")])),_:1}),(0,s.bF)(ke,{onClick:a[8]||(a[8]=e=>de.updatePersona()),color:"success",class:"font"},{default:(0,s.k6)((()=>[(0,s.bF)(me,{icon:"cil-check-alt",class:"me-2"}),(0,s.eW)("Actualizar")])),_:1})])),_:1})])),_:1},8,["visible"]),(0,s.bF)(De,{visible:ue.modalPass,onClose:a[19]||(a[19]=e=>de.clickModalPass(!1))},{default:(0,s.k6)((()=>[(0,s.bF)(Pe,{class:"headercolor",dismiss:"",onClose:a[10]||(a[10]=e=>de.clickModalPass(!1))},{default:(0,s.k6)((()=>[(0,s.bF)(we,null,{default:(0,s.k6)((()=>[X])),_:1})])),_:1}),(0,s.bF)(Ue,null,{default:(0,s.k6)((()=>[(0,s.bF)($e,{datos:ue.datos},null,8,["datos"]),(0,s.Lk)("div",K,[G,(0,s.Lk)("div",H,[(0,s.bo)((0,s.Lk)("input",{type:"password",class:"form-control","onUpdate:modelValue":a[11]||(a[11]=e=>ue.pass.pass1=e),onKeyup:a[12]||(a[12]=e=>de.botonesFuncion())},null,544),[[t.Jo,ue.pass.pass1]])])]),(0,s.Lk)("div",J,[j,(0,s.Lk)("div",q,[(0,s.bo)((0,s.Lk)("input",{type:"password",class:"form-control","onUpdate:modelValue":a[13]||(a[13]=e=>ue.pass.pass2=e),onKeyup:a[14]||(a[14]=e=>de.botonesFuncion())},null,544),[[t.Jo,ue.pass.pass2]])])]),(0,s.Lk)("div",Q,[R,(0,s.Lk)("div",O,[(0,s.bo)((0,s.Lk)("input",{type:"password",class:"form-control","onUpdate:modelValue":a[15]||(a[15]=e=>ue.pass.pass3=e),onKeyup:a[16]||(a[16]=e=>de.botonesFuncion())},null,544),[[t.Jo,ue.pass.pass3]])])]),(0,s.Lk)("div",Y,[ue.pass.pass2!=ue.pass.pass3?((0,s.uX)(),(0,s.CE)("div",Z,ae)):(0,s.Q3)("",!0)])])),_:1}),(0,s.bF)(ye,null,{default:(0,s.k6)((()=>[(0,s.bF)(ke,{onClick:a[17]||(a[17]=e=>de.clickModalPass(!1)),color:"danger",class:"font"},{default:(0,s.k6)((()=>[(0,s.bF)(me,{icon:"cil-x",class:"me-2"}),(0,s.eW)("Cancelar")])),_:1}),ue.botones?((0,s.uX)(),(0,s.Wv)(ke,{key:0,onClick:a[18]||(a[18]=e=>de.updatePass()),color:"success",class:"font"},{default:(0,s.k6)((()=>[(0,s.bF)(me,{icon:"cil-check-alt",class:"me-2"}),(0,s.eW)("Actualizar")])),_:1})):(0,s.Q3)("",!0)])),_:1})])),_:1},8,["visible"]),(0,s.bF)(De,{visible:ue.modalFoto,onClose:a[24]||(a[24]=e=>de.clickModalFoto(!1))},{default:(0,s.k6)((()=>[(0,s.Lk)("form",{onSubmit:a[23]||(a[23]=(0,t.D$)((e=>de.updateFoto()),["prevent"])),enctype:"multipart/form-data"},[(0,s.bF)(Pe,{class:"headercolor",dismiss:"",onClose:a[20]||(a[20]=e=>de.clickModalFoto(!1))},{default:(0,s.k6)((()=>[(0,s.bF)(we,null,{default:(0,s.k6)((()=>[oe])),_:1})])),_:1}),(0,s.bF)(Ue,null,{default:(0,s.k6)((()=>[(0,s.Lk)("div",se,[le,(0,s.Lk)("div",te,[(0,s.Lk)("input",{type:"file",ref:"file",class:"form-control",accept:"image/png,image/jpeg",onChange:a[21]||(a[21]=e=>de.selectFile()),required:"true"},null,544)])]),ie,(0,s.Lk)("div",re,[(0,s.Lk)("img",{src:ue.egovf.foto,class:"img-fluid"},null,8,ce)])])),_:1}),(0,s.bF)(ye,null,{default:(0,s.k6)((()=>[(0,s.bF)(ke,{onClick:a[22]||(a[22]=e=>de.clickModalFoto(!1)),color:"danger",class:"font"},{default:(0,s.k6)((()=>[(0,s.bF)(me,{icon:"cil-x",class:"me-2"}),(0,s.eW)("Cancelar")])),_:1}),(0,s.Lk)("button",ne,[(0,s.bF)(me,{icon:"cil-camera",class:"me-2"}),(0,s.eW)("Actualizar")])])),_:1})],32)])),_:1},8,["visible"])],64)}o(4114);var de=o(5259),fe=o(6025),me=o(7950),ke=o(7160),pe={name:"PerfilView",components:{ComponenteNombres:de.A},data(){return{tab:1,modalCelular:!1,modalPass:!1,modalFoto:!1,titulo:"Perfil de Usuario",egovfService:null,uploadService:null,usuarioService:null,botones:!1,usuario:{token:"",cif:"",correo:"",celular:"",pass:"",unidad:"",sigla:""},egovf:{idPersona:0,nombre:"",paterno:"",materno:"",fecha:"",sexo:0,idUsuario:0,cif:0,matricula:0,ci:"",ci_com:0,complemento:"",correo:"",celular:"",pass:"",unidad:"",dependiente:"",sigla:"",foto:"",empleado:0},pass:{id:null,cif:"",pass1:"",pass2:"",pass3:""},datos:{cif:0,nombre:"",apellido:""}}},computed:{},created(){this.usuarioService=new fe.A,this.egovfService=new me.A,this.uploadService=new ke.A},mounted(){this.getDatos(),this.getEgovf()},beforeCreate(){null==this.$cookies.get("cif")&&this.$router.push("/")},methods:{getDatos(){null!=this.$cookies.get("cif")&&(this.usuario.token=this.$cookies.get("token"),this.usuario.cif=this.$cookies.get("cif"),this.usuario.correo=this.$cookies.get("correo"),this.usuario.celular=this.$cookies.get("celular"),this.usuario.pass=this.$cookies.get("pass"),this.usuario.unidad=this.$cookies.get("unidad"),this.usuario.sigla=this.$cookies.get("sigla"),this.$cookies.set("titulo",this.titulo),this.usuarioService.headersUsuario(this.usuario.token))},async getEgovf(){this.egovfService.headersUsuario(this.usuario.token),await this.egovfService.getEgovf(this.usuario.cif).then((e=>{this.egovf=e.data})),this.datos.cif=this.egovf.cif,this.datos.nombre=this.egovf.nombre,this.datos.apellido=this.egovf.paterno+" "+this.egovf.materno},updatePersona(){this.$swal.fire({title:"Desea Realizar los Cambios",icon:"info",showDenyButton:!0,confirmButtonText:"Actualizar",denyButtonText:"Cancelar"}).then((e=>{e.isConfirmed?this.usuarioService.updatePersona(this.egovf).then((e=>{200==e.status?this.$swal.fire("Tus Datos Guardados Corectamente","","success"):this.$swal.fire("Los Datos no fueron Guardados Error",e.status,"error")})):e.isDenied&&this.$swal.fire("Datos Cancelados","","info")}))},updatePass(){this.pass.id=this.egovf.id,this.pass.cif=this.egovf.cif,this.$swal.fire({title:"Desea Actualizar la contraseña ?",showDenyButton:!0,confirmButtonText:"Actualizar",denyButtonText:"Cancelar"}).then((e=>{e.isConfirmed?this.usuarioService.updatePass(this.pass).then((e=>{1==e.data?(this.$swal.fire("Datos Guardados Corectamente","Inicie secion nuevamente","success"),this.$cookies.remove("token"),this.$cookies.remove("cif"),this.$cookies.remove("correo"),this.$cookies.remove("celular"),this.$cookies.remove("pass"),this.$router.push("/")):this.$swal.fire("La Contraseña Actual no es Correcta Verifique e intente Nuevamente","","error")})):e.isDenied&&this.$swal.fire("Datos Cancelados","","info")}))},botonesFuncion(){""!=this.pass.pass1&&""!=this.pass.pass2&&this.pass.pass2==this.pass.pass3?this.botones=!0:this.botones=!1},selectFile(){this.archivo=this.$refs.file.files[0]},async updateFoto(){const e=new FormData;e.append("archivo",this.archivo);try{this.uploadService.addImagen(e).then((e=>{200==e.status?(this.egovf.foto=this.uploadService.getUrl()+e.data.nombre,this.$swal.fire({title:"Desea Subir su foto de perfil ?",showDenyButton:!0,confirmButtonText:"Aceptar",denyButtonText:"Cancelar"}).then((e=>{e.isConfirmed?this.usuarioService.updateUsuario(this.egovf).then((e=>{200==e.status?this.$swal.fire("La Foto de Perfil fue guardado correctamente","","success").then((e=>{e&&location.reload()})):this.$swal.fire("La Foto de Perfil no pudo ser Guardado, intente mas tarde"+e.status,"","error")})):e.isDenied&&this.$swal.fire("Datos Cancelados","","info")}))):this.$swal.fire("La foto de Perfil No puede ser guardado Intente mas tarde","error")}))}catch(a){console.log(a)}},clicktab(e){this.tab=e},clickModalCelular(e){this.modalCelular=e},clickModalPass(e){this.modalPass=e},clickModalFoto(e){this.modalFoto=e}}},be=o(1241);const ve=(0,be.A)(pe,[["render",ue]]);var ge=ve}}]);
//# sourceMappingURL=626.2abb1f3e.js.map