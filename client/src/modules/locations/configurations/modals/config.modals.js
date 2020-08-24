angular.module('bhima.controllers')
  .controller('ConfigLocationsModalController', ConfigLocationsModalController);

ConfigLocationsModalController.$inject = [
  '$state', 'LocationService', 'NotifyService', 'appcache',
];

/**
 * Configuration locations Modal Controller
 */

function ConfigLocationsModalController($state, LocationService, Notify, AppCache) {
  const vm = this;
  const cache = AppCache('ConfigModalLocation');

  vm.choice = {};
  vm.stateParams = {};
  vm.parentElement = {};
  vm.locations = {};
  vm.is_highest = 1;

  // exposed methods
  vm.submit = submit;
  vm.closeModal = closeModal;

  if ($state.params.creating || $state.params.id) {
    cache.stateParams = $state.params;
    vm.stateParams = cache.stateParams;
    vm.choice.parent = $state.params.parentId;
  } else {
    vm.stateParams = cache.stateParams;
  }
  vm.isCreating = vm.stateParams.creating;
  vm.parentId = vm.stateParams.parentId;
  vm.parentUuid = vm.stateParams.parentUuid;

  vm.locationTypeId = vm.stateParams.locationTypeId;

  if (!vm.isCreating) {
    LocationService.read(vm.stateParams.id)
      .then(data => {
        vm.locations = data;

        if (vm.locations.parent !== 0) {
          vm.is_highest = 0;
        }
      })
      .catch(Notify.handleError);
  }

  if (vm.parentId) {
    vm.is_highest = 0;
    vm.locations.parent = vm.parentId;

    LocationService.read(vm.parentId)
      .then(parent => {
        vm.parentElement = parent;
      })
      .catch(Notify.handleError);
  }

  if (vm.locationTypeId) {
    vm.excludeType = vm.locationTypeId;
  }

  if (vm.parentUuid) {
    vm.locations.parent_uuid = vm.parentUuid;
  }

  vm.onSelectLocationTypeSelect = onSelectLocationTypeSelect;
  vm.onDefineLocationChange = onDefineLocationChange;
  vm.onSelectParent = onSelectParent;

  function onSelectLocationTypeSelect(type) {
    vm.locations.location_type_id = type.id;
    vm.is_highest = vm.stateParams.parentId ? 0 : 1;
  }

  function onDefineLocationChange(value) {
    vm.is_highest = value;
  }

  function onSelectParent(locationParent) {
    vm.locations.parent = locationParent.id;
    vm.locations.parent_uuid = locationParent.uuid;
  }

  // submit the data to the server from all two forms (update, create)
  function submit(configLocationForm) {
    vm.hasNoChange = configLocationForm.$submitted && configLocationForm.$pristine && !vm.isCreating;
    if (configLocationForm.$invalid) { return null; }
    if (configLocationForm.$pristine) { return null; }

    delete vm.locations.label_name;

    const promise = (vm.isCreating)
      ? LocationService.create(vm.locations)
      : LocationService.update(vm.locations.id, vm.locations);

    return promise
      .then(() => {
        const translateKey = (vm.isCreating) ? 'FORM.INFO.CREATE_SUCCESS' : 'FORM.INFO.UPDATE_SUCCESS';
        Notify.success(translateKey);
        $state.go('locationsConfiguration', null, { reload : true });
      })
      .catch(Notify.handleError);
  }

  function closeModal() {
    $state.go('locationsConfiguration');
  }
}