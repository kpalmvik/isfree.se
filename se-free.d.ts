declare module "se-free" {
  function seFree(domain: string): Promise<status>;

  export default seFree;
}
