# HCP Client

## Prerequisite

- Access to knowledgeparkGmbH/NodePackage Azure Feed (see [Client documentation](../documentation/02_Client.md#prerequisite))

## Build and test

`mvn clean install`

---

## Run

`npm start`

---

## About Webcomponents consumption

> There is a strong relation between this project and the project zPA. In HCP one can render und use the zPA app inside the HCP app.
> For more info's on how to compile and publish the zPA webcomponent have a look into the docs of zPA itself, where this process is described.  
> In this documentation the focus is on how to consume zPA in the context of HCP and allow a event-based communication between those two.
> So this part of the documentation assumes, that one has access to a published version of the zPA Webcomponenent node-module.

### prereq

* one needs access to `@patientenakte:registry=https://pkgs.dev.azure.com/knowledgeparkGmbH/KPARK/_packaging/NodePackage/npm/registry/`
* please check  [Client](../documentation/02_Client.md#prerequisite) for this
* wc will be used for webcomponent

### installation

* `mvn clean install` will ensure all packages are resolved

### usage of webcomponents in this angular context

* we opted to use a component to wrap the encapsulated wc
* inside the `ngOnInit` we made use of dynamic import
  * `await import('@patientenakte/zpa-portal-client/main.js');` ..
  * consider this for cases when your bundle name differs in output or you want to add styles from the wc
* add an element as rendertarget 
  * `document.createElement('zpa-root')`;
* enrich the hcp routing to also be able to route inside zPA
  * ```
     this.routeDataService.currentRoute$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(route => {
      const currentZpaRoute = route.split('/').at(-1) || '';
      zpaRoot.setAttribute('route', currentZpaRoute);
    });
    ```
* add fields that matches the toplevel `@Input()` and populate them with values like this
  * ` zpaRoot.setAttribute('ibsnr', '49990071');`
* recieve events in HCP from zPA, here an example that sends the patients name to the hcp context and displays it in the tab
  * ```
     zpaRoot.addEventListener('patient', event => {
      const patient = (event as CustomEvent).detail;
      const name = patient.lastName + ', ' + patient.firstName;
      this.tabService.changeTabName(name);
     });
    ```

## local development without gateway

see [localdev](../manualTest/environments/localdev/README.md)
