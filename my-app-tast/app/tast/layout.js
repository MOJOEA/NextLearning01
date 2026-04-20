export default function TastLayout({ children }) {
  return (
    <section>
      <div>Sub Header</div>
      <main>{children}</main>
      <div>Sub Footer</div>
    </section>
  );
}
