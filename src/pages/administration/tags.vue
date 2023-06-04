<!-- <template>
    <v-combobox
      class="filter-box"
      v-model="chip"
      chips
      clearable
      closable-chips
      label="Filter resources..."
      multiple
      variant="solo-filled"
      @keydown.enter="addChip"
      @click:right="openColorPicker"
      @click:close="closeColorPicker"
    >
      <template v-slot:item="{ item, attrs, on, select }">
        <v-chip
          v-bind="attrs"
          @click="select()"
          :style="{ backgroundColor: item.color }"
          close
        >
          <strong>{{ item.title }}</strong>
        </v-chip>
      </template>
    </v-combobox>
    <v-dialog v-model="colorPickerOpen" @closed="closeColorPicker">
      <v-card>
        <v-card-title>
          <span class="text-h5">Set Tag Color</span>
        </v-card-title>
        <v-card-text>
          <v-color-picker v-model="selectedColor" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeColorPicker">Cancel</v-btn>
          <v-btn color="primary" text @click="addChipWithColor">Add Tag</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        categories: [],
        chips: [],
        chip: '',
        colorPickerOpen: false,
        selectedColor: '#000000'
      };
    },
    methods: {
      remove(item) {
        this.chips.splice(this.chips.indexOf(item), 1);
      },
      openColorPicker() {
        this.selectedColor = '#000000';
        this.colorPickerOpen = true;
      },
      closeColorPicker() {
        this.colorPickerOpen = false;
      },
      addChipWithColor() {
        if (this.chip) {
          const newChip = {
            title: this.chip,
            color: this.selectedColor
          };
          this.chips.push(newChip);
          this.chip = '';
          this.closeColorPicker();
        }
      },
      addChip() {
        if (this.chip && !this.categories.includes(this.chip)) {
          this.openColorPicker();
        }
      }
    }
  };
  </script>
  
  <style>
  .filter-box {
    width: 100%;
    max-width: 550px;
  }
  </style>
   -->
<template>
  <v-combobox class="filter-box" v-model="chips" chips clearable closable-chips label="Filter resources..." multiple
    variant="solo-filled">
    <template v-slot:selection="{ attrs, category, select, selected }">
      <v-chip closable v-bind="attrs" :model-value="selected" @click="select"  @click:close="logChipText(category)" :on-click="logChipText(category)">
        <strong>{{ category }}</strong>&nbsp;
      </v-chip>
    </template>
  </v-combobox>
</template>
<script>
export default {
  data() {
    return {
      categories: [
        'All',
        'Computer Lab',
        'Projector Cart',
        'Room',
        'Tote',
        'Cart',
        'Math'
      ],
      chips: [],
    }
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
    },
  },
}
</script>
<style>
.filter-box {
  width: 100%;
  max-width: 550px;
}
</style>
