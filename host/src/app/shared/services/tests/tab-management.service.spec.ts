import {TabManagementService} from '../tab-management.service';

describe('TabManagement', () => {
  const initialTabs = [
    {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'},
    {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'},
    {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'},
    {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'},
    {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'},
    {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'},
    {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'},
    {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'}
  ];
  let service: TabManagementService;

  beforeEach(() => {
    service = new TabManagementService();
  });

  it('should have initial value', () => {
    expect(service.cTabs()).toEqual(initialTabs);
  });

  it('should add tab', () => {
    const newTab = {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'};
    service.addTab();
    expect(service.cTabs()).toEqual([...initialTabs, newTab]);
  });

  it('should remove tab', () => {
    const filteredTabs = service.cTabs().filter((_, index) => index !== 0)
    service.removeTab(0);
    expect(service.cTabs()).toEqual(filteredTabs);
  });
});
