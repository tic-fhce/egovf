"use strict";(self["webpackChunkegovf"]=self["webpackChunkegovf"]||[]).push([[396],{1133:function(o,e,t){t.d(e,{A:function(){return l}});var i=t(4373),a=t(1660);const s=a.Qy;class l{getEmpleado(o){return i.A.get(s+"empleado/getEmpleado",{params:{cif:o}})}getListaTipoEmpleado(){return i.A.get(s+"tipo/listar")}getListarEmpleadoModuloCif(o){return i.A.get(s+"modulo/getListarEmpleadoModuloCif",{params:{cif:o}})}getListarEmpleadoModulo(o){return i.A.get(s+"modulo/getListarEmpleadoModulo",{params:{cif:o}})}addContrato(o){const e=new Date;let t=o.numerocontrato;const a={cif:o.cif,numero_contrato:t.toUpperCase(),servicio:o.servicio,unidad:o.unidad,inicio:o.inicio,fin:o.fin,gestion:e.getFullYear(),detalle:o.detalle,idTipoEmpleado:o.idTipoEmpleado};return console.log(a),i.A.post(s+"contrato/addContrato",a)}setContrato(o){let e=o.numerocontrato;const t={id:o.id,cif:o.cif,numero_contrato:e.toUpperCase(),servicio:o.servicio,unidad:o.unidad,inicio:o.inicio,fin:o.fin,gestion:o.gestion,detalle:o.detalle,idTipoEmpleado:o.idTipoEmpleado};return i.A.put(s+"contrato/actualizarContrato",t)}getTipoEmpleado(o){return i.A.get(s+"tipo/getTipoEmpleado",{params:{id:o}})}getListaEmpleado(o){return i.A.get(s+"empleado/getListaEmpleado",{params:{tipo:o}})}getListaModulo(){return i.A.get(s+"modulo/listar")}addEmpleadoModulo(o){const e={_01cif:o.cif,_02id_modulo:o.id_modulo,_03estado:1};return i.A.post(s+"empmodulo/addEmpleadoModulo",e)}updateEstado(o,e){const t=new Date,a={id:o.id,_01cif:o.cif,_02tipo_empleado_id:o.tipoempleado_id,_03fecha:o.fecha,_04estado:e,_05salida:t.toLocaleDateString("en-CA")};return i.A.put(s+"empleado/updateEmpleado",a)}getListaEmpleadoTipo(o){return i.A.get(s+"empleado/listarTipo",{params:{tipo:o}})}}},7590:function(o,e,t){t.d(e,{A:function(){return l}});var i=t(4373),a=t(1660);const s=a.fw;class l{getPerfil(o){return i.A.get(s+"biometrico/getPerfil",{params:{cif:o}})}getListarCifCero(){return i.A.get(s+"biometrico/listarCifCero")}getHorario(o,e){return i.A.get(s+"horario/getHorario",{params:{gestion:o,cif:e}})}updateBiometrico(o){return i.A.put(s+"biometrico/updateBiometrico",o)}getAvisoAll(){return i.A.get(s+"aviso/getAvisoAll")}getAviso(){return i.A.get(s+"aviso/getAviso")}getObsUsuario(o,e,t){return i.A.get(s+"obs/getObsUsuario",{params:{cif:o,gestion:e,mes:t}})}addObsEmpleado(o){const e={cif:o.cif,uidobs:o.uidobs,fechainicio:o.fechainicio,fechafin:o.fechafin,gestion:o.fechainicio.substring(0,4),mes:o.fechainicio.substring(5,7),di:o.fechainicio.substring(8,10),df:o.fechafin.substring(8,10),detalle:o.detalle,imagen:o.imagen,tipo:o.tipo,hora:o.hora,h:o.hora.substring(0,2),m:o.hora.substring(3,5),url:o.url,estado:0,tipoId:0};return i.A.post(s+"obs/addObs",e)}updateObsEmpleado(o){const e={id:o.id,cif:o.cif,uidobs:o.uidobs,fechainicio:o.fechainicio,fechafin:o.fechafin,gestion:o.fechainicio.substring(0,4),mes:o.fechainicio.substring(5,7),di:o.fechainicio.substring(8,10),df:o.fechafin.substring(8,10),detalle:o.detalle,imagen:o.imagen,tipo:o.tipo,hora:o.hora,h:o.hora.substring(0,2),m:o.hora.substring(3,5),url:o.url,estado:o.estado,tipoId:0};return i.A.put(s+"obs/updateObs",e)}getListaHorario(o,e){return i.A.get(s+"horario/getListaHorario",{params:{cif:o,gestion:e}})}getReporteMes(o){return i.A.get(s+"marcado/reporteMes",{params:{cif:o.cif,gestion:o.gestion,mes:o.mes,di:o.di,df:o.df}})}getReporteMesDia(o){return i.A.get(s+"marcado/reporteMesDia",{params:{cif:o.cif,gestion:o.gestion,mes:o.mes,di:o.di,df:o.df}})}addHorario(o){const e={cif:o.cif,fecha:o.fecha,salida:o.salida,tipo:o.tipo,lem:o.lem,lsm:o.lsm,let:o.let,lst:o.lst,mem:o.mem,msm:o.msm,met:o.met,mst:o.mst,miem:o.miem,mism:o.mism,miet:o.miet,mist:o.mist,jem:o.jem,jsm:o.jsm,jet:o.jet,jst:o.jst,vem:o.vem,vsm:o.vsm,vet:o.vet,vst:o.vst,sem:o.sem,ssm:o.ssm,set:o.set,sst:o.sst,dem:o.dem,dsm:o.dsm,det:o.det,dst:o.dst};return i.A.post(s+"horario/addHorario",e)}addObs(o){const e={cif:o.cif,uidobs:o.uidobs,fechainicio:o.fechainicio,fechafin:o.fechafin,gestion:o.fechainicio.substring(0,4),mes:o.fechainicio.substring(5,7),di:o.fechainicio.substring(8,10),df:o.fechafin.substring(8,10),detalle:o.detalle,imagen:o.imagen,tipo:o.tipo,hora:o.hora,h:o.hora.substring(0,2),m:o.hora.substring(3,5),url:o.url,estado:1,tipoId:0};return i.A.post(s+"obs/addObs",e)}updateObs(o){const e={id:o.id,cif:o.cif,uidobs:o.uidobs,fechainicio:o.fechainicio,fechafin:o.fechafin,gestion:o.gestion,mes:o.mes,di:o.di,df:o.df,detalle:o.detalle,imagen:o.imagen,tipo:o.tipo,hora:o.hora,h:o.h,m:o.m,url:o.url,estado:o.estado,tipoId:o.tipoId};return i.A.put(s+"obs/updateObs",e)}getListaObs(o){return i.A.get(s+"obs/getListaObs",{params:{gestion:o}})}addObsAll(o){const e={id:0,cif:o.cif,sexo:o.sexo,uidobs:o.uidobs,fechainicio:o.fechainicio,fechafin:o.fechafin,gestion:o.fechainicio.substring(0,4),mes:o.fechainicio.substring(5,7),di:o.fechainicio.substring(8,10),df:o.fechafin.substring(8,10),detalle:o.detalle,imagen:o.imagen,tipo:o.tipo,hora:o.hora,h:o.hora.substring(0,2),m:o.hora.substring(3,5),url:o.url,estado:1};return i.A.post(s+"obs/addObsAll",e)}addAviso(o){const e={titulo:o.titulo,detalle:o.detalle,icon:o.icon,estado:1};return i.A.post(s+"aviso/addAviso",e)}updateAviso(o){const e={id:o.id,titulo:o.titulo,detalle:o.detalle,icon:o.icon,estado:o.estado};return i.A.put(s+"aviso/updateAviso",e)}getRecord(o){return i.A.get(s+"marcado/reporteTotal",{params:{gestion:o.gestion,mes:o.mes,tipo:o.tipo}})}getListarBiometrico(){return i.A.get(s+"biometrico/listarBiometrico")}getLBiometricoTipo(o){return i.A.get(s+"biometrico/listarBiometricoTipo",{params:{tipo:o}})}updateBiometricoTipo(o,e){var t=0;1==e&&(t=o.tipoempleado_id);const a={id:0,_01user_id:0,_02nombre:"",_03cif:o.cif,_04estado:0,_05horario_id:0,_06lugar:"",_07id_tipo:t,_08detalle:"",_09sexo:0};return i.A.put(s+"biometrico/updateBiometricoTipo",a)}getObs(o,e,t){return i.A.get(s+"obs/getObs",{params:{cif:o,gestion:e,mes:t}})}estadoBiometrico(o){return console.log(o),i.A.put(s+"biometrico/estadoBiometrico",o)}updateTipo(o,e){return i.A.put(s+"biometrico/updateTipo",{params:{cif:o,tipo:e}})}getListaEquipo(){return i.A.get(s+"equipo/listar")}addEquipo(o){return i.A.post(s+"equipo/addEquipo",o)}updateEquipo(o){return i.A.put(s+"equipo/updateEquipo",o)}}},4396:function(o,e,t){t.r(e),t.d(e,{default:function(){return oe}});var i=t(6768);const a=(0,i.Lk)("br",null,null,-1);function s(o,e,t,s,l,n){const d=(0,i.g2)("ComponenteDatosPersonalesVue"),r=(0,i.g2)("ComponenteMEmpVue");return(0,i.uX)(),(0,i.CE)(i.FK,null,[(0,i.bF)(d,{cifCiudadano:l.cifCiudadano,egovfp:l.egovf},null,8,["cifCiudadano","egovfp"]),a,(0,i.bF)(r,{emp:l.egovf},null,8,["emp"])],64)}t(4114);var l=t(9790),n=t(4232),d=t(5130);const r=(0,i.Lk)("label",{class:"d-none d-md-flex me-auto"},"Modulos Del Empleado",-1),u={class:"table"},c=(0,i.Lk)("label",{class:"d-none d-md-flex me-auto"},"Modulos",-1),m=(0,i.Lk)("label",{class:"d-none d-md-flex me-auto"},"Contratos",-1),f=(0,i.Lk)("label",{class:"d-none d-md-flex me-auto"},"Menu",-1),p=(0,i.Lk)("br",null,null,-1),h=(0,i.Lk)("br",null,null,-1),g={class:"table"},b=(0,i.Lk)("thead",null,[(0,i.Lk)("tr",null,[(0,i.Lk)("th",null,"#"),(0,i.Lk)("th",null,"N° Contrato"),(0,i.Lk)("th",null,"Servicio"),(0,i.Lk)("th",null,"Fechas"),(0,i.Lk)("th",null,"Detalle"),(0,i.Lk)("th")])],-1),k=(0,i.Lk)("br",null,null,-1),v=(0,i.Lk)("strong",null,"Fecha Inicio: ",-1),C=(0,i.Lk)("br",null,null,-1),L=(0,i.Lk)("strong",null,"Fecha Fin: ",-1),_=(0,i.Lk)("br",null,null,-1),E=(0,i.Lk)("strong",null,"Gestion: ",-1),M=(0,i.Lk)("tfoot",null,[(0,i.Lk)("tr")],-1),A=(0,i.Lk)("br",null,null,-1),F={class:"table"},w=(0,i.Lk)("thead",null,[(0,i.Lk)("tr",null,[(0,i.Lk)("th",null,"#"),(0,i.Lk)("th",null,"Titulo"),(0,i.Lk)("th",null,"Ruta"),(0,i.Lk)("th",null,"Estado"),(0,i.Lk)("th")])],-1),U=(0,i.Lk)("tfoot",null,[(0,i.Lk)("tr")],-1),D=(0,i.Lk)("h5",null,"Agregar Modulos",-1),y=(0,i.Lk)("hr",null,null,-1),S={class:"mb-3 row"},$=(0,i.Lk)("label",{for:"datos",class:"col-6 col-form-label"},"Modulo",-1),T={class:"col-6"},x=["value"],B={class:"btn btn-success font"},W=(0,i.Lk)("h5",null,"Agregar Contrato",-1),I=(0,i.Lk)("hr",null,null,-1),q={class:"mb-3 row"},X=(0,i.Lk)("label",{for:"numero",class:"col-6 col-form-label"},"Numero de Contrato",-1),V={class:"col-6"},z={class:"mb-3 row"},O=(0,i.Lk)("label",{for:"servicio",class:"col-6 col-form-label"},"Servicios prestados",-1),P={class:"col-6"},N={class:"mb-3 row"},j=(0,i.Lk)("label",{for:"servicio",class:"col-6 col-form-label"},"Tipo de Empleado",-1),J={class:"col-6"},G=["value"],K={class:"mb-3 row"},H=(0,i.Lk)("label",{for:"datos",class:"col-6 col-form-label"},"Unidad ",-1),R={class:"col-6"},Q=["value"],Y={class:"mb-3 row"},Z=(0,i.Lk)("label",{for:"inicio",class:"col-6 col-form-label"},"Fecha de Inicio",-1),oo={class:"col-6"},eo={class:"mb-3 row"},to=(0,i.Lk)("label",{for:"fin",class:"col-6 col-form-label"},"Fecha de Conclucion ",-1),io={class:"col-6"},ao={class:"mb-3 row"},so=(0,i.Lk)("label",{for:"detalle",class:"col-6 col-form-label"},"Detalle",-1),lo={class:"col-6"},no={class:"btn btn-success font"},ro=(0,i.Lk)("h5",null,"Editar Contrato",-1),uo=(0,i.Lk)("hr",null,null,-1),co={class:"mb-3 row"},mo=(0,i.Lk)("label",{for:"numero",class:"col-6 col-form-label"},"Numero de Contrato",-1),fo={class:"col-6"},po={class:"mb-3 row"},ho=(0,i.Lk)("label",{for:"servicio",class:"col-6 col-form-label"},"Servicios prestados",-1),go={class:"col-6"},bo={class:"mb-3 row"},ko=(0,i.Lk)("label",{for:"datos",class:"col-6 col-form-label"},"Unidad ",-1),vo={class:"col-6"},Co=["value"],Lo={class:"mb-3 row"},_o=(0,i.Lk)("label",{for:"inicio",class:"col-6 col-form-label"},"Fecha de Inicio",-1),Eo={class:"col-6"},Mo={class:"mb-3 row"},Ao=(0,i.Lk)("label",{for:"fin",class:"col-6 col-form-label"},"Fecha de Conclucion ",-1),Fo={class:"col-6"},wo={class:"mb-3 row"},Uo=(0,i.Lk)("label",{for:"fin",class:"col-6 col-form-label"},"Gestion ",-1),Do={class:"col-6"},yo={class:"mb-3 row"},So=(0,i.Lk)("label",{for:"detalle",class:"col-6 col-form-label"},"Detalle",-1),$o={class:"col-6"},To={class:"btn btn-success font"};function xo(o,e,t,a,s,l){const xo=(0,i.g2)("CCol"),Bo=(0,i.g2)("CIcon"),Wo=(0,i.g2)("CDropdownToggle"),Io=(0,i.g2)("CButton"),qo=(0,i.g2)("CDropdownItem"),Xo=(0,i.g2)("CDropdownDivider"),Vo=(0,i.g2)("CDropdownMenu"),zo=(0,i.g2)("CDropdown"),Oo=(0,i.g2)("CRow"),Po=(0,i.g2)("CCardHeader"),No=(0,i.g2)("CNavLink"),jo=(0,i.g2)("CNavItem"),Jo=(0,i.g2)("CNav"),Go=(0,i.g2)("CCardFooter"),Ko=(0,i.g2)("CCard"),Ho=(0,i.g2)("CTabPane"),Ro=(0,i.g2)("CBadge"),Qo=(0,i.g2)("CTabContent"),Yo=(0,i.g2)("CCardBody"),Zo=(0,i.g2)("CModalTitle"),oe=(0,i.g2)("CModalHeader"),ee=(0,i.g2)("ComponenteNombres"),te=(0,i.g2)("CModalBody"),ie=(0,i.g2)("CModalFooter"),ae=(0,i.g2)("CModal");return(0,i.uX)(),(0,i.CE)(i.FK,null,[(0,i.bF)(Oo,null,{default:(0,i.k6)((()=>[(0,i.bF)(xo,{lg:12},{default:(0,i.k6)((()=>[(0,i.bF)(Ko,null,{default:(0,i.k6)((()=>[(0,i.bF)(Po,{class:"headercolor"},{default:(0,i.k6)((()=>[(0,i.bF)(Oo,null,{default:(0,i.k6)((()=>[(0,i.bF)(xo,{lg:6},{default:(0,i.k6)((()=>[r])),_:1}),(0,i.bF)(xo,{lg:6,class:"text-end"},{default:(0,i.k6)((()=>[(0,i.bF)(zo,{variant:"btn-group"},{default:(0,i.k6)((()=>[(0,i.bF)(Wo,{color:"success",class:"font",size:"sm"},{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{icon:"cil-menu",class:"me-2"}),(0,i.eW)("Opciones")])),_:1}),(0,i.bF)(Vo,null,{default:(0,i.k6)((()=>[(0,i.bF)(qo,null,{default:(0,i.k6)((()=>[(0,i.bF)(Io,{onClick:e[0]||(e[0]=o=>l.clickModalModulo(!0)),size:"sm"},{default:(0,i.k6)((()=>[(0,i.eW)("Agregar Modulo")])),_:1})])),_:1}),(0,i.bF)(Xo),(0,i.bF)(qo,null,{default:(0,i.k6)((()=>[(0,i.bF)(Io,{onClick:e[1]||(e[1]=o=>l.clickModalContrato(!0)),size:"sm"},{default:(0,i.k6)((()=>[(0,i.eW)("Agregar Contrato")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,i.bF)(Yo,null,{default:(0,i.k6)((()=>[(0,i.bF)(xo,{xs:12,class:"table-responsive"},{default:(0,i.k6)((()=>[(0,i.Lk)("table",u,[(0,i.Lk)("tbody",null,[(0,i.Lk)("tr",null,[(0,i.Lk)("td",null,"Tipo : "+(0,n.v_)(s.empleado.empleado),1),(0,i.Lk)("td",null,"Ingreso : "+(0,n.v_)(s.empleado.fecha),1),(0,i.Lk)("td",null,"Salida : "+(0,n.v_)(s.empleado.salida),1),(0,i.Lk)("td",null,[(0,i.eW)(" Estado : "),1===s.empleado.estado?((0,i.uX)(),(0,i.Wv)(Io,{key:0,color:"success",class:"font",size:"sm",onClick:e[2]||(e[2]=o=>l.updateEstado(0))},{default:(0,i.k6)((()=>[(0,i.eW)("Activo")])),_:1})):((0,i.uX)(),(0,i.Wv)(Io,{key:1,color:"danger",class:"font",size:"sm",onClick:e[3]||(e[3]=o=>l.updateEstado(1))},{default:(0,i.k6)((()=>[(0,i.eW)("Inactivo")])),_:1}))])])])])])),_:1}),(0,i.bF)(xo,{xs:12},{default:(0,i.k6)((()=>[(0,i.bF)(Jo,{variant:"tabs",class:"nav nav-tabs"},{default:(0,i.k6)((()=>[(0,i.bF)(jo,null,{default:(0,i.k6)((()=>[(0,i.bF)(No,{active:1==s.tab,onClick:e[4]||(e[4]=o=>l.clicktab(1))},{default:(0,i.k6)((()=>[(0,i.bF)(Io,{size:"sm"},{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{icon:"cil-command"}),c])),_:1})])),_:1},8,["active"])])),_:1}),(0,i.bF)(jo,null,{default:(0,i.k6)((()=>[(0,i.bF)(No,{active:2==s.tab,onClick:e[5]||(e[5]=o=>l.clicktab(2))},{default:(0,i.k6)((()=>[(0,i.bF)(Io,{size:"sm"},{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{icon:"cil-handshake"}),m])),_:1})])),_:1},8,["active"])])),_:1}),(0,i.bF)(jo,null,{default:(0,i.k6)((()=>[(0,i.bF)(No,{active:3==s.tab,onClick:e[6]||(e[6]=o=>l.clicktab(3))},{default:(0,i.k6)((()=>[(0,i.bF)(Io,{size:"sm"},{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{icon:"cil-menu"}),f])),_:1})])),_:1},8,["active"])])),_:1})])),_:1}),(0,i.bF)(Qo,null,{default:(0,i.k6)((()=>[(0,i.bF)(Ho,{visible:1==s.tab},{default:(0,i.k6)((()=>[(0,i.bF)(Oo,null,{default:(0,i.k6)((()=>[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.listaModuloCif,(o=>((0,i.uX)(),(0,i.Wv)(xo,{lg:3,class:"text-center",key:o.id},{default:(0,i.k6)((()=>[p,(0,i.bF)(Ko,null,{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{customClassName:"nav-icon",icon:o.imagen},null,8,["icon"]),(0,i.bF)(Go,{class:"text-center"},{default:(0,i.k6)((()=>[(0,i.bF)(Io,{color:"success",class:"font",onClick:e=>l.getModulo(o.ruta)},{default:(0,i.k6)((()=>[(0,i.eW)((0,n.v_)(o.nombre),1)])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1},8,["visible"]),(0,i.bF)(Ho,{visible:2==s.tab},{default:(0,i.k6)((()=>[h,(0,i.bF)(xo,{xs:12,class:"table-responsive"},{default:(0,i.k6)((()=>[(0,i.Lk)("table",g,[b,(0,i.Lk)("tbody",null,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.contratos,(o=>((0,i.uX)(),(0,i.CE)("tr",{key:o.id},[(0,i.Lk)("td",null,(0,n.v_)(o.id),1),(0,i.Lk)("td",null,[(0,i.eW)((0,n.v_)(o.numeroContrato),1),k,(0,i.eW)(" "+(0,n.v_)(o.unidad),1)]),(0,i.Lk)("td",null,(0,n.v_)(o.servicio),1),(0,i.Lk)("td",null,[v,(0,i.eW)((0,n.v_)(o.inicio),1),C,L,(0,i.eW)(" "+(0,n.v_)(o.fin),1),_,E,(0,i.eW)((0,n.v_)(o.gestion),1)]),(0,i.Lk)("td",null,(0,n.v_)(o.detalle),1),(0,i.Lk)("td",null,[(0,i.bF)(Io,{color:"warning",class:"font",onClick:e=>l.getContrato(o.id)},{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{icon:"cil-pencil"})])),_:2},1032,["onClick"])])])))),128))]),M])])),_:1})])),_:1},8,["visible"]),(0,i.bF)(Ho,{visible:3==s.tab},{default:(0,i.k6)((()=>[A,(0,i.bF)(xo,{xs:12,class:"table-responsive"},{default:(0,i.k6)((()=>[(0,i.Lk)("h3",null,"ID: "+(0,n.v_)(s.menu.id),1),(0,i.Lk)("h3",null,"Titulo: "+(0,n.v_)(s.menu.titulo),1),(0,i.Lk)("table",F,[w,(0,i.Lk)("tbody",null,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.menu.menuObj,(o=>((0,i.uX)(),(0,i.CE)("tr",{key:o.id},[(0,i.Lk)("td",null,(0,n.v_)(o.id),1),(0,i.Lk)("td",null,(0,n.v_)(o.titulo),1),(0,i.Lk)("td",null,(0,n.v_)(o.ruta),1),(0,i.Lk)("td",null,[1==o.estado?((0,i.uX)(),(0,i.Wv)(Ro,{key:0,color:"success"},{default:(0,i.k6)((()=>[(0,i.eW)("Activo")])),_:1})):((0,i.uX)(),(0,i.Wv)(Ro,{key:1,color:"danger"},{default:(0,i.k6)((()=>[(0,i.eW)("Inactivo")])),_:1}))]),(0,i.Lk)("td",null,[1==o.estado?((0,i.uX)(),(0,i.Wv)(Io,{key:0,color:"danger",class:"font",onClick:e=>l.updateMenuUsuario(o.id,o.idmenu,0),size:"sm"},{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{icon:"cil-trash"})])),_:2},1032,["onClick"])):((0,i.uX)(),(0,i.Wv)(Io,{key:1,color:"success",class:"font",onClick:e=>l.updateMenuUsuario(o.id,o.idmenu,1),size:"sm"},{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{icon:"cil-check-alt"})])),_:2},1032,["onClick"]))])])))),128))]),U])])),_:1})])),_:1},8,["visible"])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,i.bF)(ae,{visible:s.modalModulo,onClose:e[11]||(e[11]=o=>l.clickModalModulo(!1))},{default:(0,i.k6)((()=>[(0,i.Lk)("form",{onSubmit:e[10]||(e[10]=(0,d.D$)((o=>l.addEmpleadoModulo()),["prevent"]))},[(0,i.bF)(oe,{class:"headercolor",dismiss:"",onClose:e[7]||(e[7]=o=>l.clickModalModulo(!1))},{default:(0,i.k6)((()=>[(0,i.bF)(Zo,null,{default:(0,i.k6)((()=>[D])),_:1})])),_:1}),(0,i.bF)(te,null,{default:(0,i.k6)((()=>[(0,i.bF)(ee,{datos:s.datos},null,8,["datos"]),y,(0,i.Lk)("div",S,[$,(0,i.Lk)("div",T,[(0,i.bo)((0,i.Lk)("select",{"onUpdate:modelValue":e[8]||(e[8]=o=>s.id_modulo=o),class:"form-control",required:"true"},[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.listaModulo,(o=>((0,i.uX)(),(0,i.CE)("option",{value:o.id,key:o.id},(0,n.v_)(o.nombre),9,x)))),128))],512),[[d.u1,s.id_modulo]])])])])),_:1}),(0,i.bF)(ie,null,{default:(0,i.k6)((()=>[(0,i.bF)(Io,{onClick:e[9]||(e[9]=o=>l.clickModalModulo(!1)),color:"danger",class:"font"},{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{icon:"cil-x",class:"me-2"}),(0,i.eW)("Cancelar")])),_:1}),(0,i.Lk)("button",B,[(0,i.bF)(Bo,{icon:"cil-check-alt",class:"me-2"}),(0,i.eW)("Agregar Modulo ")])])),_:1})],32)])),_:1},8,["visible"]),(0,i.bF)(ae,{visible:s.modalContrato,onClose:e[22]||(e[22]=o=>l.clickModalContrato(!1))},{default:(0,i.k6)((()=>[(0,i.Lk)("form",{onSubmit:e[21]||(e[21]=(0,d.D$)((o=>l.addContrato()),["prevent"]))},[(0,i.bF)(oe,{class:"headercolor",dismiss:"",onClose:e[12]||(e[12]=o=>l.clickModalContrato(!1))},{default:(0,i.k6)((()=>[(0,i.bF)(Zo,null,{default:(0,i.k6)((()=>[W])),_:1})])),_:1}),(0,i.bF)(te,null,{default:(0,i.k6)((()=>[(0,i.bF)(ee,{datos:s.datos},null,8,["datos"]),I,(0,i.Lk)("div",q,[X,(0,i.Lk)("div",V,[(0,i.bo)((0,i.Lk)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[13]||(e[13]=o=>s.contrato.numerocontrato=o),placeholder:"Numero de contrato",required:"true"},null,512),[[d.Jo,s.contrato.numerocontrato]])])]),(0,i.Lk)("div",z,[O,(0,i.Lk)("div",P,[(0,i.bo)((0,i.Lk)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[14]||(e[14]=o=>s.contrato.servicio=o),placeholder:"Servicios Prestados",required:"true"},null,512),[[d.Jo,s.contrato.servicio]])])]),(0,i.Lk)("div",N,[j,(0,i.Lk)("div",J,[(0,i.bo)((0,i.Lk)("select",{"onUpdate:modelValue":e[15]||(e[15]=o=>s.contrato.idTipoEmpleado=o),class:"form-control",required:"true"},[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.listaTipoEmpleado,(o=>((0,i.uX)(),(0,i.CE)("option",{value:o.id,key:o.id},(0,n.v_)(o.detalle),9,G)))),128))],512),[[d.u1,s.contrato.idTipoEmpleado]])])]),(0,i.Lk)("div",K,[H,(0,i.Lk)("div",R,[(0,i.bo)((0,i.Lk)("select",{"onUpdate:modelValue":e[16]||(e[16]=o=>s.contrato.unidad=o),class:"form-control",required:"true"},[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.listaUnidades,(o=>((0,i.uX)(),(0,i.CE)("option",{value:o.unidad,key:o.id},(0,n.v_)(o.unidad),9,Q)))),128))],512),[[d.u1,s.contrato.unidad]])])]),(0,i.Lk)("div",Y,[Z,(0,i.Lk)("div",oo,[(0,i.bo)((0,i.Lk)("input",{type:"date",class:"form-control","onUpdate:modelValue":e[17]||(e[17]=o=>s.contrato.inicio=o),placeholder:"Inicio",required:"true"},null,512),[[d.Jo,s.contrato.inicio]])])]),(0,i.Lk)("div",eo,[to,(0,i.Lk)("div",io,[(0,i.bo)((0,i.Lk)("input",{type:"date",class:"form-control","onUpdate:modelValue":e[18]||(e[18]=o=>s.contrato.fin=o),placeholder:"fin",required:"true"},null,512),[[d.Jo,s.contrato.fin]])])]),(0,i.Lk)("div",ao,[so,(0,i.Lk)("div",lo,[(0,i.bo)((0,i.Lk)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[19]||(e[19]=o=>s.contrato.detalle=o),placeholder:"Detalle del Contrato",required:"true"},null,512),[[d.Jo,s.contrato.detalle]])])])])),_:1}),(0,i.bF)(ie,null,{default:(0,i.k6)((()=>[(0,i.bF)(Io,{onClick:e[20]||(e[20]=o=>l.clickModalContrato(!1)),color:"danger",class:"font"},{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{icon:"cil-x",class:"me-2"}),(0,i.eW)("Cancelar")])),_:1}),(0,i.Lk)("button",no,[(0,i.bF)(Bo,{icon:"cil-check-alt",class:"me-2"}),(0,i.eW)("Agregar Contrato ")])])),_:1})],32)])),_:1},8,["visible"]),(0,i.bF)(ae,{visible:s.modalEditarContrato,onClose:e[33]||(e[33]=o=>l.clickModalEditarContrato(!1))},{default:(0,i.k6)((()=>[(0,i.Lk)("form",{onSubmit:e[32]||(e[32]=(0,d.D$)((o=>l.updateContrato()),["prevent"]))},[(0,i.bF)(oe,{class:"headercolor",dismiss:"",onClose:e[23]||(e[23]=o=>l.clickModalEditarContrato(!1))},{default:(0,i.k6)((()=>[(0,i.bF)(Zo,null,{default:(0,i.k6)((()=>[ro])),_:1})])),_:1}),(0,i.bF)(te,null,{default:(0,i.k6)((()=>[(0,i.bF)(ee,{datos:s.datos},null,8,["datos"]),uo,(0,i.Lk)("div",co,[mo,(0,i.Lk)("div",fo,[(0,i.bo)((0,i.Lk)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[24]||(e[24]=o=>s.setContrato.numerocontrato=o),placeholder:"Numero de contrato",required:"true"},null,512),[[d.Jo,s.setContrato.numerocontrato]])])]),(0,i.Lk)("div",po,[ho,(0,i.Lk)("div",go,[(0,i.bo)((0,i.Lk)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[25]||(e[25]=o=>s.setContrato.servicio=o),placeholder:"Servicios Prestados",required:"true"},null,512),[[d.Jo,s.setContrato.servicio]])])]),(0,i.Lk)("div",bo,[ko,(0,i.Lk)("div",vo,[(0,i.bo)((0,i.Lk)("select",{"onUpdate:modelValue":e[26]||(e[26]=o=>s.setContrato.unidad=o),class:"form-control",required:"true"},[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.listaUnidades,(o=>((0,i.uX)(),(0,i.CE)("option",{value:o.unidad,key:o.id},(0,n.v_)(o.unidad),9,Co)))),128))],512),[[d.u1,s.setContrato.unidad]])])]),(0,i.Lk)("div",Lo,[_o,(0,i.Lk)("div",Eo,[(0,i.bo)((0,i.Lk)("input",{type:"date",class:"form-control","onUpdate:modelValue":e[27]||(e[27]=o=>s.setContrato.inicio=o),placeholder:"Inicio",required:"true"},null,512),[[d.Jo,s.setContrato.inicio]])])]),(0,i.Lk)("div",Mo,[Ao,(0,i.Lk)("div",Fo,[(0,i.bo)((0,i.Lk)("input",{type:"date",class:"form-control","onUpdate:modelValue":e[28]||(e[28]=o=>s.setContrato.fin=o),placeholder:"fin",required:"true"},null,512),[[d.Jo,s.setContrato.fin]])])]),(0,i.Lk)("div",wo,[Uo,(0,i.Lk)("div",Do,[(0,i.bo)((0,i.Lk)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[29]||(e[29]=o=>s.setContrato.gestion=o),placeholder:"fin",required:"true"},null,512),[[d.Jo,s.setContrato.gestion]])])]),(0,i.Lk)("div",yo,[So,(0,i.Lk)("div",$o,[(0,i.bo)((0,i.Lk)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[30]||(e[30]=o=>s.setContrato.detalle=o),placeholder:"Detalle del Contrato",required:"true"},null,512),[[d.Jo,s.setContrato.detalle]])])])])),_:1}),(0,i.bF)(ie,null,{default:(0,i.k6)((()=>[(0,i.bF)(Io,{onClick:e[31]||(e[31]=o=>l.clickModalEditarContrato(!1)),color:"danger",class:"font"},{default:(0,i.k6)((()=>[(0,i.bF)(Bo,{icon:"cil-x",class:"me-2"}),(0,i.eW)("Cancelar")])),_:1}),(0,i.Lk)("button",To,[(0,i.bF)(Bo,{icon:"cil-check-alt",class:"me-2"}),(0,i.eW)("Actualizar Contrato ")])])),_:1})],32)])),_:1},8,["visible"])],64)}var Bo=t(8512),Wo=t(6025),Io=t(1133),qo=t(9115),Xo=t(4373),Vo=t(1660);const zo=Vo.j6;class Oo{headersUsuario(o){Xo.A.defaults.headers.common["Authorization"]="Bearer "+o}getMenu(o){return console.log(o),Xo.A.get(zo+"menu/getMenu",{params:{cif:o}})}getMenuModulo(o,e){return Xo.A.get(zo+"menu/getMenuModulo",{params:{cif:o,titulo:e}})}updateMenuUsuario(o,e,t,i){const a={id:o,_01cif:e,_02idmenu:t,_03estado:i};return Xo.A.put(zo+"updateMenuUsuario",a)}addMenuUsuario(o,e){const t={_01cif:o,_02idmenu:e,_03estado:1};return Xo.A.post(zo+"addMenuUsuario",t)}}var Po=t(7590);const No=Vo.ru;class jo{headersUsuario(o){Xo.A.defaults.headers.common["Authorization"]="Bearer "+o}getListaModulo(){return Xo.A.get(No+"listarAll")}getListarModuloCif(o){return Xo.A.get(No+"listarModuloCif",{params:{cif:o}})}addModulo(o){const e={_01cif:o.cif,_02id_modulo:o.idmodulo,_03estado:1};return Xo.A.post(No+"moduloUsuario/agregarModulo",e)}updateModuloUsuario(o,e,t){const i={id:0,_01cif:o,_02id_modulo:e,_03estado:t};return Xo.A.put(No+"moduloUsuario/updateModuloUsuario",i)}}var Jo=t(3903),Go={name:"ComponenteMEmpVue",props:["emp"],components:{ComponenteNombres:Bo.A,CDropdown:Jo.ji},data(){return{modalModulo:!1,modalContrato:!1,modalEditarContrato:!1,empleadoService:null,unidadService:null,usuarioService:null,moduloService:null,sccService:null,menuService:null,listaModulo:[],listaModuloCif:[],listaTipoEmpleado:[],listaUnidades:[],id_modulo:0,id_tipoEmpleado:0,contratos:[],menu:{id:0,titulo:"",icono:"",menuObj:[]},getPB:!0,tab:1,empleado:{id:0,cif:0,empleado:"",tipoempleado_id:0,fecha:"",estado:0,salida:"",contratos:[]},usuario:{token:"",cif:"",correo:"",celular:"",pass:"",unidad:"",sigla:""},empleado_modulo:{cif:0,id_modulo:0},contrato:{cif:0,id:0,numerocontrato:"",servicio:"",unidad:"",inicio:"",fin:"",gestion:0,detalle:"",idTipoEmpleado:0},setContrato:{id:0,cif:0,empleado:0,numerocontrato:"",servicio:"",unidad:"",inicio:"",fin:"",gestion:0,detalle:"",idTipoEmpleado:0},unidad:{id:0,unidad:"",dependencia:"",sigla:""},egovf:{idPersona:0,nombre:"",paterno:"",materno:"",fecha:"",sexo:0,idUsuario:0,cif:0,matricula:0,ci:"",ci_com:0,complemento:"",correo:"",celular:"",pass:"",unidad:"",dependiente:"",sigla:""},datos:{cif:0,nombre:"",apellido:""}}},beforeCreate(){null==this.$cookies.get("cif")&&this.$router.push("/")},created(){this.empleadoService=new Io.A,this.unidadService=new qo.A,this.usuarioService=new Wo.A,this.menuService=new Oo,this.sccService=new Po.A,this.moduloService=new jo},mounted(){this.getDatos(),this.getListaTipoEmpleado(),this.getUnidades()},updated(){this.egovf=this.emp,this.egovf.cif>0&&this.getPB&&(this.getEmpleado(),this.getListarEmpleadoModulo(),this.getListarEmpleadoModuloCif(),this.getPB=!1),this.datos.cif=this.egovf.cif,this.datos.nombre=this.egovf.nombre,this.datos.apellido=this.egovf.paterno+" "+this.egovf.materno},methods:{getDatos(){null!=this.$cookies.get("cif")&&(this.usuario.token=this.$cookies.get("token"),this.usuario.cif=this.$cookies.get("cif"),this.usuario.correo=this.$cookies.get("correo"),this.usuario.celular=this.$cookies.get("celular"),this.usuario.pass=this.$cookies.get("pass"),this.usuario.unidad=this.$cookies.get("unidad"),this.usuario.sigla=this.$cookies.get("sigla"),this.menuService.headersUsuario(this.usuario.token))},async getUnidades(){await this.unidadService.getUnidades().then((o=>{this.listaUnidades=o.data}))},async getEmpleado(){await this.empleadoService.getEmpleado(this.egovf.cif).then((o=>{this.empleado=o.data,this.contratos=this.empleado.contratos})),this.getMenuModulo()},async getListaTipoEmpleado(){await this.empleadoService.getListaTipoEmpleado().then((o=>{this.listaTipoEmpleado=o.data}))},async getListarEmpleadoModulo(){await this.empleadoService.getListarEmpleadoModulo(this.egovf.cif).then((o=>{this.listaModulo=o.data,console.log(this.listaModulo)}))},async getListarEmpleadoModuloCif(){await this.empleadoService.getListarEmpleadoModuloCif(this.egovf.cif).then((o=>{this.listaModuloCif=o.data,console.log(this.listaModuloCif)}))},async addEmpleadoModulo(){var o=0;this.empleado_modulo.cif=this.egovf.cif,this.empleado_modulo.id_modulo=this.id_modulo,this.listaModulo.forEach((e=>{e.id==this.id_modulo&&(o=e._04idmenu)})),await this.$swal.fire({title:"Desea Agregar el Modulo al Empleado ?",showDenyButton:!0,confirmButtonText:"Aceptar",denyButtonText:"Cancelar"}).then((e=>{e.isConfirmed?this.empleadoService.addEmpleadoModulo(this.empleado_modulo).then((e=>{200==e.status?(this.menuService.addMenuUsuario(this.empleado_modulo.cif,o).then(),this.$swal.fire("El Modulo fue Agregado al Empleado Corectamente","","success").then((o=>{o&&location.reload()}))):this.$swal.fire("Los Datos no fueron Guardados Error"+e.status,"","error")})):e.isDenied&&this.$swal.fire("Datos Cancelados","","info")}))},async addContrato(){this.usuarioService.headersUsuario(this.usuario.token),this.listaUnidades.forEach((o=>{if(o.unidad==this.contrato.unidad)return this.unidad.id=o.id,this.unidad.unidad=o.unidad,this.unidad.dependiente=o.dependiente,this.unidad.sigla=o.sigla,!1})),this.contrato.cif=this.egovf.cif,this.egovf.idPersona=this.contrato.idtipo,await this.$swal.fire({title:"Desea Agregar Contrato al Empleado ?",showDenyButton:!0,icon:"info",confirmButtonText:"Aceptar",denyButtonText:"Cancelar"}).then((o=>{o.isConfirmed?this.empleadoService.addContrato(this.contrato).then((o=>{201==o.status?this.usuarioService.updateUnidad(this.egovf,this.unidad).then((e=>{200==e.status?this.unidadService.addPertenece(this.egovf,this.unidad).then((e=>{201==e.status?this.$swal.fire("El Comtrato fue Agregado al Empleado Corectamente","","success").then((o=>{o&&location.reload()})):this.$swal.fire("Los Datos de Unidad no fueron Guardados Error"+o.status,"","error")})):this.$swal.fire("Los Datos del Usuario No fueron Actualizados"+o.status,"","error")})):this.$swal.fire("Los Datos del Contrato no fueron Guardados Error"+o.status,"","error")})):o.isDenied&&this.$swal.fire("Datos Cancelados","","info")}))},async updateContrato(){this.usuarioService.headersUsuario(this.usuario.token),this.listaUnidades.forEach((o=>{if(o.unidad==this.setContrato.unidad)return this.unidad.id=o.id,this.unidad.unidad=o.unidad,this.unidad.dependiente=o.dependiente,this.unidad.sigla=o.sigla,!1})),await this.$swal.fire({title:"Desea Actualizar el Contrato del Empleado ?",showDenyButton:!0,icon:"info",confirmButtonText:"Aceptar",denyButtonText:"Cancelar"}).then((o=>{o.isConfirmed?this.empleadoService.setContrato(this.setContrato).then((o=>{200==o.status?this.usuarioService.updateUnidad(this.egovf,this.unidad).then((e=>{200==e.status?this.unidadService.registrarPertenece(this.egovf,this.unidad).then((e=>{200==e.status?this.$swal.fire("El Comtrato fue Actializado al Empleado Corectamente","","success").then((o=>{o&&location.reload()})):this.$swal.fire("Los Datos de Unidad no fueron Guardados Error"+o.status,"","error")})):this.$swal.fire("Los Datos del Usuario No fueron Actualizados"+o.status,"","error")})):this.$swal.fire("Los Datos del Contrato no fueron Guardados Error"+o.status,"","error")})):o.isDenied&&this.$swal.fire("Datos Cancelados","","info")}))},async getMenuModulo(){await this.menuService.getMenuModulo(this.egovf.cif,"Modulo EMP").then((o=>{this.menu=o.data}))},async updateMenuUsuario(o,e,t){var i="";i=1==t?"Desea Activar El menu para el Ciudadano ":"Desea Desactivar El menu para el Ciudadano ",this.menuService.headersUsuario(this.usuario.token),await this.$swal.fire({title:i+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno+"?",showDenyButton:!0,icon:"info",confirmButtonText:"Aceptar",denyButtonText:"Cancelar"}).then((i=>{i.isConfirmed?this.menuService.updateMenuUsuario(o,this.egovf.cif,e,t).then((o=>{200==o.status?this.$swal.fire("Se Actualizaron los datos Corectamente","","success").then((o=>{o&&location.reload()})):this.$swal.fire("Los Datos no fueron Guardados Error",""+o.status,"error")})):i.isDenied&&this.$swal.fire("Datos Cancelados","","info")}))},async updateEstado(o){this.moduloService.headersUsuario(this.usuario.token);var e="";e=1==o?"Desea Activar al Empleado ?":"Desea Inactivar al Empleado ?",await this.$swal.fire({title:e,showDenyButton:!0,icon:"info",confirmButtonText:"Aceptar",denyButtonText:"Cancelar"}).then((e=>{e.isConfirmed?this.empleadoService.updateEstado(this.empleado,o).then((e=>{200==e.status?(this.sccService.updateBiometricoTipo(this.empleado,o).then(),this.moduloService.updateModuloUsuario(this.empleado.cif,1,o).then(),this.$swal.fire("El Ciudadano fue removido con exito","","success").then((o=>{o&&location.reload()}))):this.$swal.fire("Los Datos no fueron Guardados Error"+e.status,"","error")})):this.$swal.fire("Datos Cancelados","","info")}))},getModulo(o){this.$router.push({name:o,params:{cifCiudadano:this.egovf.cif}})},clickModalModulo(o){this.modalModulo=o},clickModalContrato(o){this.modalContrato=o},clickModalEditarContrato(o){this.modalEditarContrato=o},getContrato(o){console.log(this.contratos),this.contratos.forEach((e=>{e.id===o&&(this.setContrato.id=e.id,this.setContrato.cif=this.egovf.cif,this.setContrato.empleado=this.empleado.id,this.setContrato.numerocontrato=e.numero_contrato,this.setContrato.servicio=e.servicio,this.setContrato.unidad=e.unidad,this.setContrato.inicio=e.inicio,this.setContrato.fin=e.fin,this.setContrato.gestion=e.gestion,this.setContrato.detalle=e.detalle)})),this.clickModalEditarContrato(!0)},clicktab(o){this.tab=o}}},Ko=t(1241);const Ho=(0,Ko.A)(Go,[["render",xo]]);var Ro=Ho,Qo=t(7950),Yo={name:"ModuloEmpView",components:{ComponenteDatosPersonalesVue:l.A,ComponenteMEmpVue:Ro},data(){return{titulo:"Modulos del Empleado",egovfService:null,cifCiudadano:"",usuario:{token:"",cif:"",correo:"",celular:"",pass:"",unidad:"",sigla:""},egovf:{idPersona:0,nombre:"",paterno:"",materno:"",fecha:"",sexo:0,idUsuario:0,cif:0,matricula:0,ci:"",ci_com:0,complemento:"",correo:"",celular:"",pass:"",unidad:"",dependiente:"",sigla:""}}},beforeCreate(){null==this.$cookies.get("cif")&&this.$router.push("/")},created(){this.egovfService=new Qo.A},mounted(){this.cifCiudadano=this.$route.params.cifCiudadano,this.getDatos(),this.getEgovf()},methods:{getDatos(){null!=this.$cookies.get("cif")&&(this.usuario.token=this.$cookies.get("token"),this.usuario.cif=this.$cookies.get("cif"),this.usuario.correo=this.$cookies.get("correo"),this.usuario.celular=this.$cookies.get("celular"),this.usuario.pass=this.$cookies.get("pass"),this.usuario.unidad=this.$cookies.get("unidad"),this.usuario.sigla=this.$cookies.get("sigla"),this.titulo=this.usuario.correo+"> "+this.titulo)},async getEgovf(){this.egovfService.headersUsuario(this.usuario.token),await this.egovfService.getEgovf(this.cifCiudadano).then((o=>{this.egovf=o.data}))}}};const Zo=(0,Ko.A)(Yo,[["render",s]]);var oe=Zo}}]);
//# sourceMappingURL=396.8991c6ae.js.map