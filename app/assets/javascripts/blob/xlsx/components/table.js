import 'vendor/jquery.scrollTo';

export default {
  name: 'XLSXTable',
  props: {
    sheet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentLineNumber: -1,
    };
  },
  methods: {
    linePath(index) {
      let hash = location.hash.replace('#', '');
      hash = hash.replace(/-?L(\d+)$/g, '');

      if (hash !== '') {
        return `#${hash}-L${index + 1}`;
      } else {
        return `#L${index + 1}`;
      }
    },
    updateCurrentLineNumber(index) {
      this.currentLineNumber = index + 1;
    },
    getCurrentLineNumberFromUrl() {
      const hash = location.hash.replace('#', '').split('-');
      const lineHash = hash[hash.length - 1];

      this.currentLineNumber = parseInt(lineHash.replace('L', ''), 10);
    },
  },
  watch: {
    sheet: {
      handler() {
        this.getCurrentLineNumberFromUrl();
      },
      deep: true,
    }
  },
  created() {
    this.getCurrentLineNumberFromUrl();
  },
  mounted() {
    $.scrollTo(`#${this.currentLineNumber}`);
  },
  template: `
    <div class="table-responsive">
      <table
        class="table">
        <thead>
          <tr>
            <th></th>
            <th
              v-for="name in sheet.columns">
              {{ name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in sheet.rows"
            :id="index + 1"
            :class="{ hll: currentLineNumber === index + 1 }">
            <td>
              <a
                :href="linePath(index)"
                @click="updateCurrentLineNumber(index)">
                {{ index + 1 }}
              </a>
            </td>
            <td v-for="val in row">
              {{ val }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
};
