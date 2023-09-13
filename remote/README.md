## zPA Portal Client
1. [installation](#installation)
2. [usage](#usage)
3. [the project](#the-project)  
  3.1. [dead code - the drag and drop feature has been removed](#dead-code---the-removed-dragndrop-feature)
4. [difference between spa and webcomponent](#difference-between-spa-and-webcomponent)
5. [propagation events and/or reviecing inputs](#propagation-events-andor-reviecing-inputs)
---
### installation
* given nodejs is installed
* one can install it with  a `mvn clean install`, or run `npm i` to install from within the `zpa-portal-client` folder
* if there is still the dependency to font-awesome: it might come that one would need provide tokens in .zshrc (or else) for 
  * `export KPARK_FA_TOKEN=<yourFAToken>`
  * `export KPARK_COMP_LIB_TOKEN=<yourNpmToken>`
---
### usage
* `npm run start` will start a local angular development server
  * for the local development it is necessary to alter the basepath in the index.html
  * before: `<base href="/patientenakte/">`
  * after: `<base href="/">`
  * also the server needs to be run with this keyvalue pair `server.servlet.context-path=/` which can be found in the `zpa-portal-server/src/main/resources/application-localdev.properties`
* `npm run build` will run a local build as single page application
* `npm run build:prod` runs the build that is intended to be used for prod builds, in case one still needs zPA as single page application
* `npm run build:webcomponent` runs the build and bundle the project to the desired webcomponent, in such state the webcomponent can not be run like a spa any longer
* consider the `"postbuild:webcomponent": "node src/scripts/postbuild.js",` which enables a developer to make further bundle transformations possible
* tests can be run locally via `npm run test`
* tests can be watched by `npm run test:watch`
* `npm run lint` ensure the linting rules,
  * we strongly suggest using this before commit-pushing to versioncontrol
---
### the project
##### Disclaimer
> Consider that the state this software is in, is a direct result of many decisions.
> For example did we just remove the long developed drag and drop feature, when the customer UX opted to go also for a mobile view.
> Since it was unclear in this state how to have a desktop feature on mobile, but mobile would be now a import thing to scope in, there is some dead or unused code in this project contained.

The 'Patientenakte' is able to render dependend and to the infracstructre known StandAloneComponents (SCS in the follwing) into iframe contexts.
There are several SCS. One can check them in the related [repository](https://dev.azure.com/knowledgeparkGmbH/zPA/_git/ZPA-SCS) here.
In the actual state the consumed widgest are hardcoded and bound to tab, in which they route.  
The App tries to follow the latest angular version in coding styles and patterns. We opted to use signals, but since we did not update all of the app, from angular15 to angular16 one will also find `Observables$ | async` in the code.
---
### dead code - the removed drag'n'drop feature
For the reasons mentioned above a lot of zpa's feature has been removed. One can still inform itself about this [here](https://dev.azure.com/knowledgeparkGmbH/zPA/_git/ZPA-SCS?path=/doc/1_GettingStarted.md&_a=preview)

---
### difference between spa and webcomponent
> In the beginning zPA or Patientenakte is it is known now, was a standalone spa, which provided the functionality above.
> With the introduction of the wrapper HCP Portal, this changed. Patientenakte needed to be a webcomponent now, ready to be imported and consumed in the context of HCP (or others).
> For this reasons, we understand the Patientenakte as a webcomponent output and not spa any longer!
---
#### Single Page Application
  **prequisites to develop locally against scs**

see [01_GettingStartec](../doc/01_GettingStarted.md#quickstart)

---
#### Webcomponent
  **prequisites to build locally for webcomponent**
* revert the changes the basePath in index.html back to `/Patientenakte/`
* also check on [Client](../doc/02_Client.md) for additional information
* and [Release and Deployment](../doc/06_ReleaseAndDeployment.md) for more on how to release it
---
###### step by step
* run `npm run build:webcomponent` and check `dist/zpa-portal-client` for the out
* consider how to create the entrypoint's name for the webcompent and adjust it here in `src/main.ts`
  ```
    const rootComponent = createCustomElement(RootComponent, {injector: app.injector});
    customElements.define('zpa-root', rootComponent);
    ```
* persist this to git since the release is intended to occur from the pipeline
* follow the steps of the deployment docs
* **not recommended** one can also manually trigger the release pipeline https://dev.azure.com/knowledgeparkGmbH/KPARK/_build?definitionId=380
* in the root project in `web-component-testing` can one test this locally
* adjust the path as needed
  ```
    import('../zpa-portal-client/dist/zpa-portal-webcomponent/main.js');
    ```
---
#### propagation events and/or reviecing inputs
* the keyfile is `/src/app/root.component.ts` !

* if one passes values from the host to this webcomponent we consider it input, so
* the `@Input()` is expected to match on the consumers side
  * consumer : `` zpaRoot.setAttribute('ibsnr', '49990071');``
  * zpa :  
  ```
    @Input() set ibsnr(iBSNR: string) {
      if (iBSNR) {
        this.inputParamsService.sIBSNR.set(iBSNR);
      }
    }
   ```
* for sending data from the webcomponent to the host
* this example sends the patients name from the wc to the host
* zpa : 
  * ```
    @Output() patient = new EventEmitter<Patient>();
    ```
* also know this is bound in the constructor 
  * ```
    dataService.patient$.pipe(takeUntilDestroyed()).subscribe(patient => {
      this.patient.emit(patient);
    });
    ```
* consumer will have to add:
  *  ```
     zpaRoot.addEventListener('patient', event => {
      const patient = (event as CustomEvent).detail;
      const name = patient.lastName + ', ' + patient.firstName;
      this.tabService.changeTabName(name);
     });```
=======
