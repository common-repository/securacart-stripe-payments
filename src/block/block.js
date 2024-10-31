/* eslint-disable template-curly-spacing */
/* eslint-disable space-unary-ops */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable space-in-parens */
/**
 * BLOCK: SecuraCart Payments
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";
import { RadioControl, TextControl } from "@wordpress/components";
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, URLInput } = wp.blockEditor;

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/block-securacart", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("SecuraCart Payment"), // Block title.
  icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [
    __("SecuraCart — Stripe Payment Forms"),
    __("Stripe Checkout"),
    __("Payment form"),
  ],
  attributes: {
    url: {
      type: "string",
    },
    type: {
      type: "string",
    },
    buttonText: {
      type: "string",
    },
  },
  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  edit: (props) => {
    const isValid = true;

    const {
      className,
      setAttributes,
      attributes: { url, type, buttonText },
    } = props;

    return (
      <div
        className={className}
        style={{
          background: "#edf2f7",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ padding: "24px 24px 12px 24px", margin: "0 auto" }}>
          <URLInput
            autoFocus
            id="url-input"
            label="SecuraCart Product URL"
            disableSuggestions
            className={` ${!isValid ? "is-error" : undefined}`}
            value={url}
            onChange={(url, post) => {
              setAttributes({
                url,
              });
            }}
          />
          <RadioControl
            label="Embed type"
            help="Select an embed option"
            selected={type}
            options={[
              { label: "Form", value: "form" },
              { label: "Button", value: "button" },
            ]}
            onChange={(option) =>
              props.setAttributes({
                type: option,
              })
            }
          />

          {type === "button" && (
            <TextControl
              required
              label="Button Text"
              className={` ${!isValid ? "is-error" : undefined}`}
              placeholder="Pay"
              value={buttonText}
              onChange={(value) => {
                setAttributes({
                  buttonText: value,
                });
              }}
            />
          )}
          <small className="small">
            Need help?{" "}
            <a href="/">Read our guide to getting started with WordPress</a>
          </small>
        </div>
        <div
          style={{
            background: "white",
            display: "flex",
            justifyContent: "center",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <img
            alt="SecuraCart Logo"
            width="200"
            src="https://securacart.s3.us-east-2.amazonaws.com/logo.svg"
          />
        </div>
      </div>
    );
  },
  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */

  save: (props) => {
    const {
      attributes: { url, type, buttonText },
    } = props;
    const URL = url;

    const getUUID = (webaddress) => {
      const check = /((\w{4,12}-?)){5}/.exec(webaddress);
      if (check && check.length) {
        return /((\w{4,12}-?)){5}/.exec(webaddress)[0];
      }
      return null;
    };

    const UUID = getUUID(URL);

    if (!UUID) {
      return null;
    }

    if (type === "button") {
      return (
        <div>
          <button data-securacart_uuid={UUID} data-securacart_type={type}>
            {buttonText || "Pay"}
          </button>
        </div>
      );
    }
    return (
      <div>
        <div
          id="securacart"
          data-securacart_uuid={UUID}
          data-securacart_type={type}
        ></div>
      </div>
    );
  },
});
