import {TestBed} from '@angular/core/testing';

import {SettingsService} from "./settings.service";

describe('SettingsService', () => {
  let settingsService: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService]
    });
    settingsService = TestBed.get(SettingsService);
  });

  it('should be created', () => {
    expect(settingsService).toBeTruthy();
  });

  /* TODO : tester les cas d'erreurs également */
  it('should return that sidebar image index', () => {
    expect(settingsService.getSidebarImageIndex()).toBe(0);
  });

  it('sidebar image index should change', () => {
    expect(settingsService.getSidebarImageIndex()).toBe(0);
    settingsService.setSidebarImageIndex(1);
    expect(settingsService.getSidebarImageIndex()).toBe(1);

    settingsService.setSidebarImageIndex(2);
    expect(settingsService.getSidebarImageIndex()).toBe(2);
  });

  it('should return that sidebar color is #D80B0B', () => {
    expect(settingsService.getSidebarColor()).toBe('#D80B0B');
  });

  it('should change sidebar color', () => {
    expect(settingsService.getSidebarColor()).toBe('#D80B0B');
    settingsService.setSidebarColor('#27b7db');
    expect(settingsService.getSidebarColor()).toBe('#27b7db');

    settingsService.setSidebarColor('#5eeb73');
    expect(settingsService.getSidebarColor()).toBe('#5eeb73');
  });

  it('should return that sidebar filter is #fff', () => {
    expect(settingsService.getSidebarFilter()).toBe('#fff');
  });

  it('should change sidebar filter', () => {
    expect(settingsService.getSidebarFilter()).toBe('#fff');
    settingsService.setSidebarFilter('#27b7db');
    expect(settingsService.getSidebarFilter()).toBe('#27b7db');

    settingsService.setSidebarFilter('#5eeb73');
    expect(settingsService.getSidebarFilter()).toBe('#5eeb73');
  });
});

